import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, normalizeConfig, TemplateBlockConfig } from "@/lib/blocks/template-engine";
import { detectIndustry, extractSemanticConfig } from "@/lib/industry";
import { IndustryType } from "@/lib/types";

const CRO_SYSTEM_PROMPT = `Bạn là một Giám đốc Tối ưu Tỷ lệ Chuyển đổi (CRO Expert) và Chuyên gia Copywriting bán hàng hàng đầu tại Việt Nam.
Nhiệm vụ của bạn là nhận câu lệnh (prompt) từ người dùng và tạo ra một cấu trúc nội dung Landing Page bán hàng đạt chuẩn AIDA (Attention - Interest - Desire - Action) nhằm tối đa hóa tỷ lệ chuyển đổi khách để lại thông tin (Lead Conversion).

YÊU CẦU ĐẦU RA BẮT BUỘC:
Trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown backticks, không giải thích thêm) theo đúng cấu trúc sau:
{
  "brandName": "Tên thương hiệu ngắn gọn",
  "tagline": "Slogan/Định vị thương hiệu USP viết hoa",
  "headline": "Tiêu đề Hero đánh trúng nỗi đau hoặc mong muốn tột bậc của khách hàng",
  "subheadline": "Mô tả giải pháp cụ thể, dẫn chứng công nghệ, bằng chứng cam kết",
  "discountText": "Lời kêu gọi khẩn cấp (Ưu đãi giới hạn, giảm % hoặc quà tặng)",
  "primaryColorHex": "#màu hex chính 6 ký tự (ví dụ #0d9488, #4f46e5, #e11d48, #78350f)",
  "accentColorHex": "#màu hex phụ tạo điểm nhấn CTA",
  "heroImage": "URL https ảnh Unsplash chất lượng cao liên quan đến ngành",
  "hotline": "Số hotline liên hệ (VD: 0988.123.456)",
  "features": [
    { "title": "Lợi thế 1", "desc": "Mô tả chi tiết 1-2 câu", "icon": "emoji đại diện" },
    { "title": "Lợi thế 2", "desc": "Mô tả chi tiết 1-2 câu", "icon": "emoji đại diện" },
    { "title": "Lợi thế 3", "desc": "Mô tả chi tiết 1-2 câu", "icon": "emoji đại diện" }
  ],
  "pricing": [
    { "name": "Gói 1", "price": "giá bán", "originalPrice": "giá gốc", "desc": "mô tả gói" },
    { "name": "Gói 2", "price": "giá bán", "originalPrice": "giá gốc", "desc": "mô tả gói", "badge": "BÁN CHẠY NHẤT" },
    { "name": "Gói 3", "price": "giá bán", "originalPrice": "giá gốc", "desc": "mô tả gói" }
  ],
  "testimonials": [
    { "name": "Tên khách hàng kèm độ tuổi, địa phương", "role": "Nghề nghiệp", "comment": "Cảm nhận chân thực", "rating": 5 },
    { "name": "Tên khách hàng kèm độ tuổi, địa phương", "role": "Nghề nghiệp", "comment": "Cảm nhận chân thực", "rating": 5 }
  ]
}`;

const TIMEOUT_MS = 25_000;

async function callGemini(prompt: string, apiKey: string): Promise<unknown> {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: `${CRO_SYSTEM_PROMPT}\n\nNgười dùng yêu cầu tạo Landing Page với câu lệnh: "${prompt}"` }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Gemini trả về lỗi ${res.status}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini không trả về nội dung");
  return JSON.parse(text);
}

async function callOpenAI(prompt: string, apiKey: string): Promise<unknown> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: CRO_SYSTEM_PROMPT },
        { role: "user", content: `Tạo Landing Page cho yêu cầu: "${prompt}"` },
      ],
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`OpenAI trả về lỗi ${res.status}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI không trả về nội dung");
  return JSON.parse(content);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = String(body.prompt ?? "").trim().slice(0, 1000);
    const provider = String(body.provider ?? "mock");
    const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
    const explicitIndustry = body.industry as IndustryType | undefined;

    if (!prompt) {
      return NextResponse.json({ error: "Vui lòng nhập mô tả trang web." }, { status: 400 });
    }

    let config: TemplateBlockConfig | null = null;
    let industry: IndustryType = "general";
    let usedProvider = "smart-template-engine";
    let fallbackReason: string | undefined;

    if ((provider === "gemini" || provider === "openai") && !apiKey) {
      fallbackReason = "Chưa nhập API key nên đã dùng Smart Template Engine.";
    } else if (provider === "gemini" || provider === "openai") {
      try {
        const raw = provider === "gemini" ? await callGemini(prompt, apiKey) : await callOpenAI(prompt, apiKey);
        industry = explicitIndustry && explicitIndustry in INDUSTRY_PRESETS ? explicitIndustry : detectIndustry(prompt);
        // Lấy preset cùng ngành làm nền: trường LLM bỏ sót hoặc sai kiểu sẽ được thay bằng giá trị an toàn.
        config = normalizeConfig(raw, INDUSTRY_PRESETS[industry]);
        usedProvider = provider === "gemini" ? "gemini-2.0-flash" : "gpt-4o-mini";
      } catch (err: any) {
        fallbackReason = `${err?.message || "Gọi AI thất bại"}. Đã chuyển sang Smart Template Engine.`;
      }
    }

    if (!config) {
      const extracted = extractSemanticConfig(prompt, explicitIndustry);
      config = extracted.config;
      industry = extracted.industry;
    }

    return NextResponse.json({
      success: true,
      provider: usedProvider,
      fallbackReason,
      industry,
      config,
      html: generateLandingPageHtml(config),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lỗi tạo trang bằng AI" }, { status: 500 });
  }
}
