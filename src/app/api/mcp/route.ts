import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, TemplateBlockConfig } from "@/lib/blocks/template-engine";
import { detectIndustry } from "@/lib/industry";
import { getLeads, getSite, newSlug, savePublished, setSite } from "@/lib/store";
import { IndustryType } from "@/lib/types";

const PROTOCOL_VERSION = "2024-11-05";
const SERVER_INFO = { name: "PromptToSite MCP Server", version: "1.1.0" };

const EDITABLE_FIELDS = [
  "brandName", "tagline", "headline", "subheadline", "discountText", "hotline", "primaryColorHex", "accentColorHex",
] as const;
type EditableField = (typeof EDITABLE_FIELDS)[number];

// Danh sách MCP Tools theo chuẩn Anthropic MCP (JSON-RPC 2.0)
const MCP_TOOLS = [
  {
    name: "generate_landing_page",
    description: "Tạo Landing Page bán hàng chuẩn CRO từ mô tả tự nhiên và đặt làm trang đang soạn trong Web Studio.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "Mô tả sản phẩm, dịch vụ hoặc chiến dịch (VD: 'Landing page spa trị mụn giảm 50%')" },
        industry: { type: "string", enum: ["spa", "coffee", "course", "fashion", "general"], description: "Ngành nghề (bỏ trống để tự nhận diện)" },
        brandName: { type: "string", description: "Tên thương hiệu (tùy chọn)" },
        discount: { type: "string", description: "Nội dung ưu đãi hoặc % giảm giá (tùy chọn)" },
      },
      required: ["prompt"],
    },
  },
  {
    name: "update_landing_page_block",
    description: "Cập nhật một trường nội dung hoặc màu sắc của trang đang soạn.",
    inputSchema: {
      type: "object",
      properties: {
        field: { type: "string", enum: [...EDITABLE_FIELDS], description: "Trường cần thay đổi" },
        value: { type: "string", description: "Giá trị mới (màu phải ở dạng #RRGGBB)" },
      },
      required: ["field", "value"],
    },
  },
  {
    name: "publish_landing_page",
    description: "Xuất bản trang đang soạn và trả về đường dẫn công khai.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_crm_leads",
    description: "Lấy danh sách khách hàng tiềm năng (Leads) đã đăng ký qua các Landing Page.",
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number", description: "Số lead tối đa (mặc định 10)" } },
    },
  },
];

type Json = Record<string, unknown>;
const text = (payload: unknown, isError = false) => ({
  content: [{ type: "text", text: typeof payload === "string" ? payload : JSON.stringify(payload, null, 2) }],
  ...(isError ? { isError: true } : {}),
});

async function callTool(name: string, args: Json, origin: string) {
  switch (name) {
    case "generate_landing_page": {
      const prompt = String(args.prompt ?? "").slice(0, 1000);
      const requested = args.industry as IndustryType | undefined;
      const industry: IndustryType = requested && requested in INDUSTRY_PRESETS ? requested : detectIndustry(prompt);
      const config: TemplateBlockConfig = JSON.parse(JSON.stringify(INDUSTRY_PRESETS[industry]));
      if (typeof args.brandName === "string" && args.brandName.trim()) config.brandName = args.brandName.trim().slice(0, 60);
      if (typeof args.discount === "string" && args.discount.trim()) config.discountText = `Ưu đãi: ${args.discount.trim().slice(0, 120)}`;

      const site = await setSite(config, industry, "mcp");
      return text({
        status: "success",
        message: `Đã tạo Landing Page cho "${config.brandName}". Web Studio sẽ tự cập nhật.`,
        brandName: config.brandName,
        industry,
        version: site.version,
        previewUrl: `${origin}/preview`,
      });
    }

    case "update_landing_page_block": {
      const field = args.field as EditableField;
      const value = String(args.value ?? "").trim();
      if (!EDITABLE_FIELDS.includes(field)) return text(`Trường '${args.field}' không được hỗ trợ.`, true);
      if (!value) return text("Giá trị mới không được để trống.", true);
      if ((field === "primaryColorHex" || field === "accentColorHex") && !/^#[0-9a-fA-F]{6}$/.test(value)) {
        return text("Màu phải có dạng #RRGGBB, ví dụ #0d9488.", true);
      }

      const current = await getSite();
      const industry = current?.industry ?? "spa";
      const config = { ...(current?.config ?? INDUSTRY_PRESETS.spa), [field]: value.slice(0, 320) } as TemplateBlockConfig;
      const site = await setSite(config, industry, "mcp");
      return text({ status: "success", updatedField: field, newValue: config[field], version: site.version, previewUrl: `${origin}/preview` });
    }

    case "publish_landing_page": {
      const site = await getSite();
      const config = site?.config ?? INDUSTRY_PRESETS.spa;
      const slug = newSlug();
      const html = generateLandingPageHtml(config, { leadEndpoint: `/api/leads?site=${slug}` });
      await savePublished({ slug, html, brandName: config.brandName, createdAt: new Date().toISOString() });
      return text({ status: "success", url: `${origin}/s/${slug}` });
    }

    case "get_crm_leads": {
      const limit = Math.min(100, Math.max(1, Number(args.limit) || 10));
      const leads = await getLeads();
      return text({ status: "success", total: leads.length, leads: leads.slice(0, limit) });
    }

    default:
      return null;
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    ...SERVER_INFO,
    protocolVersion: PROTOCOL_VERSION,
    description: "Model Context Protocol Server cho phép AI Agent tạo, chỉnh sửa, xuất bản Landing Page và đọc CRM.",
    capabilities: { tools: { listChanged: false } },
    tools: MCP_TOOLS,
  });
}

// JSON-RPC 2.0 qua HTTP (MCP Streamable HTTP, chế độ phản hồi JSON)
export async function POST(req: Request) {
  let id: string | number | null = null;
  try {
    const { jsonrpc = "2.0", id: rid, method, params } = await req.json();
    id = rid ?? null;
    const reply = (result: unknown) => NextResponse.json({ jsonrpc, id, result });
    const fail = (code: number, message: string) => NextResponse.json({ jsonrpc, id, error: { code, message } });

    // Thông báo một chiều (không có id) chỉ cần xác nhận đã nhận.
    if (typeof method === "string" && method.startsWith("notifications/")) {
      return new NextResponse(null, { status: 202 });
    }

    switch (method) {
      case "initialize":
        return reply({ protocolVersion: PROTOCOL_VERSION, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER_INFO });
      case "ping":
        return reply({});
      case "tools/list":
        return reply({ tools: MCP_TOOLS });
      case "prompts/list":
        return reply({ prompts: [] });
      case "resources/list":
        return reply({ resources: [] });
      case "tools/call": {
        const result = await callTool(String(params?.name), (params?.arguments ?? {}) as Json, new URL(req.url).origin);
        return result ? reply(result) : fail(-32602, `Không tìm thấy công cụ '${params?.name}'`);
      }
      default:
        return fail(-32601, `Phương thức '${method}' chưa được hỗ trợ`);
    }
  } catch (err: any) {
    return NextResponse.json({ jsonrpc: "2.0", id, error: { code: -32603, message: err?.message || "Lỗi MCP nội bộ" } });
  }
}
