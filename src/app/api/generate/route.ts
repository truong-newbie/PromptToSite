import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, TemplateBlockConfig } from "@/lib/blocks/template-engine";
import { IndustryType } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, industry: explicitIndustry, apiKey } = body;

    const lowerPrompt = (prompt || "").toLowerCase();

    // Tự động nhận diện ngành nghề dựa trên từ khóa trong câu lệnh
    let detectedIndustry: IndustryType = explicitIndustry || "spa";
    if (!explicitIndustry) {
      if (lowerPrompt.includes("cà phê") || lowerPrompt.includes("cafe") || lowerPrompt.includes("trà") || lowerPrompt.includes("f&b") || lowerPrompt.includes("ăn")) {
        detectedIndustry = "coffee";
      } else if (lowerPrompt.includes("học") || lowerPrompt.includes("khóa học") || lowerPrompt.includes("tiếng anh") || lowerPrompt.includes("đào tạo") || lowerPrompt.includes("kỹ năng")) {
        detectedIndustry = "course";
      } else if (lowerPrompt.includes("thời trang") || lowerPrompt.includes("áo") || lowerPrompt.includes("quần") || lowerPrompt.includes("váy") || lowerPrompt.includes("đầm") || lowerPrompt.includes("túi")) {
        detectedIndustry = "fashion";
      } else if (lowerPrompt.includes("spa") || lowerPrompt.includes("thẩm mỹ") || lowerPrompt.includes("giảm béo") || lowerPrompt.includes("da") || lowerPrompt.includes("nha khoa")) {
        detectedIndustry = "spa";
      } else {
        detectedIndustry = "general";
      }
    }

    // Lấy preset mẫu
    const baseConfig: TemplateBlockConfig = { ...INDUSTRY_PRESETS[detectedIndustry] };

    // Tinh chỉnh thông minh dựa trên prompt của người dùng
    if (lowerPrompt.includes("giảm") || lowerPrompt.includes("ưu đãi") || lowerPrompt.includes("%")) {
      const discountMatch = prompt.match(/(\d+%\s*|\d+\s*phần trăm)/i);
      if (discountMatch) {
        baseConfig.discountText = `ƯU ĐÃI ĐẶC BIỆT: GIẢM ${discountMatch[0].toUpperCase()} CHO KHÁCH HÀNG ĐẶT HÔM NAY`;
      }
    }

    // Nếu người dùng có tên thương hiệu riêng trong ngoặc kép
    const brandMatch = prompt.match(/“([^”]+)”|"([^"]+)"/);
    if (brandMatch) {
      baseConfig.brandName = brandMatch[1] || brandMatch[2];
    }

    // Sinh HTML hoàn chỉnh
    const html = generateLandingPageHtml(baseConfig);

    return NextResponse.json({
      success: true,
      industry: detectedIndustry,
      config: baseConfig,
      html,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Lỗi tạo trang bằng AI" },
      { status: 500 }
    );
  }
}

