import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, TemplateBlockConfig } from "@/lib/blocks/template-engine";
import { IndustryType } from "@/lib/types";

// Định nghĩa danh sách MCP Tools theo chuẩn Anthropic MCP Protocol (JSON-RPC 2.0)
const MCP_TOOLS = [
  {
    name: "generate_landing_page",
    description: "Tạo cấu trúc Landing Page bán hàng tự động tối ưu tỷ lệ chuyển đổi (CRO) từ câu lệnh tự nhiên.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "Mô tả sản phẩm, dịch vụ hoặc chiến dịch khuyến mãi (ví dụ: 'Landing page spa trị mụn giảm 50%')",
        },
        industry: {
          type: "string",
          enum: ["spa", "coffee", "course", "fashion", "general"],
          description: "Ngành nghề kinh doanh",
        },
        brandName: {
          type: "string",
          description: "Tên thương hiệu doanh nghiệp (tùy chọn)",
        },
        discount: {
          type: "string",
          description: "Nội dung ưu đãi hoặc % giảm giá (tùy chọn)",
        },
      },
      required: ["prompt"],
    },
  },
  {
    name: "update_landing_page_block",
    description: "Cập nhật một khối nội dung cụ thể trên Landing Page (tiêu đề, màu sắc, ưu đãi, bảng giá).",
    inputSchema: {
      type: "object",
      properties: {
        field: {
          type: "string",
          enum: ["headline", "subheadline", "discountText", "primaryColorHex", "accentColorHex", "hotline"],
          description: "Trường dữ liệu cần thay đổi",
        },
        value: {
          type: "string",
          description: "Giá trị mới cho trường",
        },
      },
      required: ["field", "value"],
    },
  },
  {
    name: "get_crm_leads",
    description: "Truy xuất danh sách khách hàng tiềm năng (Leads) đã đăng ký qua Landing Page từ cơ sở dữ liệu CRM.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Số lượng lead tối đa cần lấy (mặc định 10)",
        },
      },
    },
  },
];

// Xử lý GET request (Khám phá endpoint MCP)
export async function GET() {
  return NextResponse.json({
    status: "online",
    name: "PromptToSite MCP Server",
    version: "1.0.0",
    protocolVersion: "2024-11-05",
    description: "Model Context Protocol Server cho phép AI Agent tương tác trực tiếp với Landing Page Sandbox & CRM.",
    capabilities: {
      tools: {
        listChanged: false,
      },
      prompts: {},
      resources: {},
    },
    tools: MCP_TOOLS,
  });
}

// Xử lý POST request theo chuẩn JSON-RPC 2.0
export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { jsonrpc = "2.0", id, method, params } = json;

    // 1. Danh sách Tools
    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc,
        id,
        result: {
          tools: MCP_TOOLS,
        },
      });
    }

    // 2. Thực thi Tool (tools/call)
    if (method === "tools/call") {
      const toolName = params?.name;
      const args = params?.arguments || {};

      // Tool 1: Tạo Landing Page
      if (toolName === "generate_landing_page") {
        const ind = (args.industry as IndustryType) || "spa";
        const baseConfig: TemplateBlockConfig = { ...(INDUSTRY_PRESETS[ind] || INDUSTRY_PRESETS.general) };

        if (args.brandName) baseConfig.brandName = args.brandName;
        if (args.discount) baseConfig.discountText = `ƯU ĐÃI: ${args.discount.toUpperCase()}`;

        const html = generateLandingPageHtml(baseConfig);

        return NextResponse.json({
          jsonrpc,
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  status: "success",
                  message: `Đã sinh thành công Landing Page cho thương hiệu ${baseConfig.brandName}`,
                  brandName: baseConfig.brandName,
                  industry: ind,
                  previewUrl: `http://localhost:3000/?preview=true&brand=${encodeURIComponent(baseConfig.brandName)}`,
                  htmlLength: html.length,
                }, null, 2),
              },
            ],
          },
        });
      }

      // Tool 2: Cập nhật khối nội dung
      if (toolName === "update_landing_page_block") {
        return NextResponse.json({
          jsonrpc,
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  status: "success",
                  updatedField: args.field,
                  newValue: args.value,
                  message: `Khối ${args.field} đã được cập nhật thành công.`,
                }, null, 2),
              },
            ],
          },
        });
      }

      // Tool 3: Lấy danh sách Leads CRM
      if (toolName === "get_crm_leads") {
        const mockLeads = [
          {
            id: "lead_1",
            fullName: "Nguyễn Văn Hùng",
            phone: "0988123456",
            note: "Quan tâm gói trải nghiệm 299k",
            submittedAt: "10:15:30",
          },
          {
            id: "lead_2",
            fullName: "Trần Thị Mai",
            phone: "0912789654",
            note: "Cần tư vấn trong giờ hành chính",
            submittedAt: "10:22:15",
          },
        ];

        return NextResponse.json({
          jsonrpc,
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  status: "success",
                  count: mockLeads.length,
                  leads: mockLeads,
                }, null, 2),
              },
            ],
          },
        });
      }

      // Tool không tồn tại
      return NextResponse.json({
        jsonrpc,
        id,
        error: {
          code: -32601,
          message: `Method '${toolName}' not found`,
        },
      });
    }

    // Các phương thức khác
    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc,
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: {
            name: "PromptToSite MCP Server",
            version: "1.0.0",
          },
        },
      });
    }

    return NextResponse.json({
      jsonrpc,
      id,
      error: {
        code: -32601,
        message: `Unsupported method '${method}'`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32603,
        message: err.message || "Internal MCP error",
      },
    });
  }
}

