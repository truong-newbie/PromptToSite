import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, TemplateBlockConfig } from "@/lib/blocks/template-engine";
import { detectIndustry } from "@/lib/industry";
import { getLeads, getSite, logModerationFlag, newSlug, savePublished, setSite, verifyApiToken } from "@/lib/store";
import { IndustryType } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth";
import { checkRateLimit } from "@/lib/ratelimit";
import { moderateLandingPage } from "@/lib/moderation";

const PROTOCOL_VERSION = "2024-11-05";
const SERVER_INFO = { name: "PromptToSite MCP Server", version: "1.2.0" };

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
        projectId: { type: "string", description: "Mã dự án cần cập nhật (bỏ trống sẽ lấy dự án gần nhất)" },
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
        projectId: { type: "string", description: "Mã dự án cần cập nhật (bỏ trống sẽ lấy dự án gần nhất)" },
      },
      required: ["field", "value"],
    },
  },
  {
    name: "publish_landing_page",
    description: "Xuất bản trang đang soạn và trả về đường dẫn công khai.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: { type: "string", description: "Mã dự án cần xuất bản (tùy chọn)" },
      },
    },
  },
  {
    name: "get_crm_leads",
    description: "Lấy danh sách khách hàng tiềm năng (Leads) đã đăng ký qua các Landing Page.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Số lead tối đa (mặc định 10)" },
        projectId: { type: "string", description: "Lọc theo mã dự án (tùy chọn)" },
      },
    },
  },
];

type Json = Record<string, unknown>;
const text = (payload: unknown, isError = false) => ({
  content: [{ type: "text", text: typeof payload === "string" ? payload : JSON.stringify(payload, null, 2) }],
  ...(isError ? { isError: true } : {}),
});

async function callTool(name: string, args: Json, origin: string, userId: string) {
  const projectId = typeof args.projectId === "string" && args.projectId.trim() ? args.projectId.trim() : undefined;

  switch (name) {
    case "generate_landing_page": {
      const prompt = String(args.prompt ?? "").slice(0, 1000);
      const requested = args.industry as IndustryType | undefined;
      const industry: IndustryType = requested && requested in INDUSTRY_PRESETS ? requested : detectIndustry(prompt);
      const config: TemplateBlockConfig = JSON.parse(JSON.stringify(INDUSTRY_PRESETS[industry]));
      if (typeof args.brandName === "string" && args.brandName.trim()) config.brandName = args.brandName.trim().slice(0, 60);
      if (typeof args.discount === "string" && args.discount.trim()) config.discountText = `Ưu đãi: ${args.discount.trim().slice(0, 120)}`;

      const site = await setSite(config, industry, "mcp", { projectId, userId, promptHistory: prompt });
      return text({
        status: "success",
        message: `Đã tạo Landing Page cho "${config.brandName}". Web Studio sẽ tự cập nhật.`,
        brandName: config.brandName,
        industry,
        projectId: site.projectId,
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

      const current = await getSite(projectId, userId);
      const industry = current?.industry ?? "spa";
      const config = { ...(current?.config ?? INDUSTRY_PRESETS.spa), [field]: value.slice(0, 320) } as TemplateBlockConfig;
      const site = await setSite(config, industry, "mcp", {
        projectId: current?.projectId || projectId,
        userId,
        promptHistory: `MCP sửa ${field}`,
      });
      return text({
        status: "success",
        updatedField: field,
        newValue: config[field],
        projectId: site.projectId,
        version: site.version,
        previewUrl: `${origin}/preview`,
      });
    }

    case "publish_landing_page": {
      const site = await getSite(projectId, userId);
      const config = site?.config ?? INDUSTRY_PRESETS.spa;
      const mod = await moderateLandingPage(config);
      if (!mod.allowed) {
        await logModerationFlag({
          projectId: site?.projectId || projectId,
          userId,
          reason: mod.reason || "Vi phạm tiêu chuẩn nội dung",
          matched: mod.matched,
          snapshot: config as unknown as Record<string, any>,
        });
        return text(`Từ chối xuất bản: ${mod.reason}`, true);
      }
      const slug = newSlug();
      const html = generateLandingPageHtml(config, { leadEndpoint: `/api/leads?site=${slug}` });
      await savePublished({
        slug,
        projectId: site?.projectId || projectId,
        userId,
        html,
        brandName: config.brandName,
        createdAt: new Date().toISOString(),
      });
      return text({ status: "success", url: `${origin}/s/${slug}`, projectId: site?.projectId });
    }

    case "get_crm_leads": {
      const limit = Math.min(100, Math.max(1, Number(args.limit) || 10));
      const leads = await getLeads({ projectId, userId });
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
    const body = await req.json();
    const { jsonrpc = "2.0", id: rid, method, params } = body;
    id = rid ?? null;
    const reply = (result: unknown) => NextResponse.json({ jsonrpc, id, result });
    const fail = (code: number, message: string, status = 200) =>
      NextResponse.json({ jsonrpc, id, error: { code, message } }, { status });

    // Xác thực Bearer Token (A3)
    const authHeader = req.headers.get("authorization") || "";
    const bearer = authHeader.toLowerCase().startsWith("bearer ") ? authHeader.slice(7).trim() : "";

    let userId = "usr_demo";
    let rateKey = req.headers.get("x-forwarded-for") || "local";

    if (bearer) {
      const verified = await verifyApiToken(bearer);
      if (!verified) {
        return fail(-32001, "Unauthorized: API Token không hợp lệ hoặc đã bị thu hồi.", 401);
      }
      userId = verified.userId;
      rateKey = verified.tokenId;
    } else {
      // Nếu không gửi Bearer token, kiểm tra phiên hoặc DEMO_MODE
      const sessionUser = await getCurrentUser();
      if (!sessionUser) {
        return fail(-32001, "Unauthorized: Thiếu header Authorization: Bearer <p2s_token>", 401);
      }
      userId = sessionUser.id;
    }

    const rl = await checkRateLimit(`mcp:${rateKey}`, 60, 60);
    if (rl.limited) {
      return fail(-32002, "Rate limit exceeded: Tối đa 60 yêu cầu / phút / token.", 429);
    }

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
        const result = await callTool(String(params?.name), (params?.arguments ?? {}) as Json, new URL(req.url).origin, userId);
        return result ? reply(result) : fail(-32602, `Không tìm thấy công cụ '${params?.name}'`);
      }
      default:
        return fail(-32601, `Phương thức '${method}' chưa được hỗ trợ`);
    }
  } catch (err: any) {
    return NextResponse.json({ jsonrpc: "2.0", id, error: { code: -32603, message: err?.message || "Lỗi MCP nội bộ" } });
  }
}
