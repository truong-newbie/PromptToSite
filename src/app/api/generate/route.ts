import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, TemplateBlockConfig } from "@/lib/blocks/template-engine";
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
  "primaryColorHex": "#màu hex chính (ví dụ #0d9488, #4f46e5, #e11d48, #78350f)",
  "accentColorHex": "#màu hex phụ tạo điểm nhấn CTA",
  "heroImage": "URL ảnh Unsplash chất lượng cao liên quan đến ngành",
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

// Trích xuất thông minh khi dùng Smart Semantic Engine (Offline / Fallback)
function extractSemanticConfig(prompt: string, explicitIndustry?: IndustryType): { industry: IndustryType; config: TemplateBlockConfig } {
  const lowerPrompt = (prompt || "").toLowerCase();

  let detectedIndustry: IndustryType = explicitIndustry || "general";
  if (!explicitIndustry) {
    if (lowerPrompt.includes("cà phê") || lowerPrompt.includes("cafe") || lowerPrompt.includes("trà") || lowerPrompt.includes("f&b") || lowerPrompt.includes("ăn uống")) {
      detectedIndustry = "coffee";
    } else if (lowerPrompt.includes("học") || lowerPrompt.includes("khóa học") || lowerPrompt.includes("tiếng anh") || lowerPrompt.includes("đào tạo") || lowerPrompt.includes("kỹ năng") || lowerPrompt.includes("ai")) {
      detectedIndustry = "course";
    } else if (lowerPrompt.includes("thời trang") || lowerPrompt.includes("áo") || lowerPrompt.includes("quần") || lowerPrompt.includes("váy") || lowerPrompt.includes("đầm") || lowerPrompt.includes("túi") || lowerPrompt.includes("boutique")) {
      detectedIndustry = "fashion";
    } else if (lowerPrompt.includes("spa") || lowerPrompt.includes("thẩm mỹ") || lowerPrompt.includes("giảm béo") || lowerPrompt.includes("da") || lowerPrompt.includes("nha khoa") || lowerPrompt.includes("mỹ phẩm")) {
      detectedIndustry = "spa";
    }
  }

  const baseConfig: TemplateBlockConfig = { ...INDUSTRY_PRESETS[detectedIndustry] };

  // Trích xuất mức giảm giá
  const discountMatch = prompt.match(/(\d+%\s*|\d+\s*phần trăm|mua 1 tặng 1|free ship)/i);
  if (discountMatch) {
    baseConfig.discountText = `ƯU ĐÃI ĐẶC BIỆT: ${discountMatch[0].toUpperCase()} CHO KHÁCH HÀNG ĐẶT HÔM NAY`;
  }

  // Trích xuất tên thương hiệu trong ngoặc kép hoặc sau các từ khoá
  const brandMatch = prompt.match(/“([^”]+)”|"([^"]+)"|cho\s+([A-ZÀ-Ỹ][\w\s&]+?)(?:,|$|\.|\s+giảm)/i);
  if (brandMatch) {
    const rawBrand = brandMatch[1] || brandMatch[2] || brandMatch[3];
    if (rawBrand && rawBrand.trim().length > 2) {
      baseConfig.brandName = rawBrand.trim();
    }
  }

  // Trích xuất số điện thoại
  const phoneMatch = prompt.match(/(0\d{9,10}|\+84\d{9,10})/);
  if (phoneMatch) {
    baseConfig.hotline = phoneMatch[0];
  }

  return { industry: detectedIndustry, config: baseConfig };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, industry: explicitIndustry, provider = "mock", apiKey } = body;

    let finalConfig: TemplateBlockConfig | null = null;
    let finalIndustry: IndustryType = "general";
    let usedProvider = "mock";

    // 1. Thử gọi Gemini API nếu người dùng chọn hoặc cung cấp key
    if ((provider === "gemini" || apiKey?.startsWith("AIza")) && apiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: `${CRO_SYSTEM_PROMPT}\n\nNgười dùng yêu cầu tạo Landing Page với câu lệnh: "${prompt}"` }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            finalConfig = JSON.parse(rawText);
            usedProvider = "gemini-2.0-flash";
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to Semantic Engine", err);
      }
    }

    // 2. Thử gọi OpenAI API nếu người dùng chọn hoặc cung cấp key
    if (!finalConfig && (provider === "openai" || apiKey?.startsWith("sk-")) && apiKey) {
      try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: CRO_SYSTEM_PROMPT },
              { role: "user", content: `Tạo Landing Page cho yêu cầu: "${prompt}"` }
            ],
            temperature: 0.7
          })
        });

        if (openaiRes.ok) {
          const openaiData = await openaiRes.json();
          const content = openaiData.choices?.[0]?.message?.content;
          if (content) {
            finalConfig = JSON.parse(content);
            usedProvider = "gpt-4o-mini";
          }
        }
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to Semantic Engine", err);
      }
    }

    // 3. Fallback mượt mà sang Smart Semantic Engine (Offline-Safe / Zero Cost)
    if (!finalConfig) {
      const extracted = extractSemanticConfig(prompt, explicitIndustry);
      finalConfig = extracted.config;
      finalIndustry = extracted.industry;
      usedProvider = "smart-template-engine (heuristic)";
    }

    // Sinh HTML hoàn chỉnh
    const html = generateLandingPageHtml(finalConfig);

    return NextResponse.json({
      success: true,
      provider: usedProvider,
      industry: finalIndustry,
      config: finalConfig,
      html,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Lỗi tạo trang bằng AI" },
      { status: 500 }
    );
  }
}
