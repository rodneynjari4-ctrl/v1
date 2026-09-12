import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { VISIONONE_SYSTEM_PROMPT, VISIONONE_ERP_MODULES, VISIONONE_INDUSTRIES } from "./src/data/visionOneKnowledge";

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS and allow cross-origin embedding in external website iframes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Security-Policy", "frame-ancestors *;");
  res.removeHeader("X-Frame-Options");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

// In-memory demo requests storage
const demoRequests: any[] = [];

// Helper to determine if response warrants a demo invitation
function shouldInviteDemo(userText: string, replyText: string): boolean {
  const text = (userText + " " + replyText).toLowerCase();
  return (
    text.includes("demo") ||
    text.includes("pricing") ||
    text.includes("quotation") ||
    text.includes("cost") ||
    text.includes("switch") ||
    text.includes("implement") ||
    text.includes("fit") ||
    text.includes("consultation") ||
    text.includes("schedule") ||
    text.includes("walkthrough")
  );
}

// Knowledge-grounded fallback generator when Gemini API key is not configured or offline
function generateKnowledgeFallbackResponse(userPrompt: string, history: Array<{ role: string; content: string }>): string {
  const prompt = userPrompt.toLowerCase().trim();

  if (prompt.includes("price") || prompt.includes("cost") || prompt.includes("pricing") || prompt.includes("how much")) {
    return "Pricing depends on the business requirements, modules, users and implementation scope. The VisionONE team can provide a suitable quotation after understanding your requirements.\n\nWould you like to request a tailored demo or consultation to discuss what your business needs?";
  }

  if (prompt.includes("etims") || prompt.includes("kra") || prompt.includes("tax")) {
    return "VisionONE supports eTIMS-related business processes and electronic invoicing workflows, helping you integrate eTIMS requirements directly into your broader financial and operational processes.\n\nIt also supports KRA automation through tax reconciliation, statutory compliance reporting, and connecting tax workflows directly to your general ledger.\n\n*(Note: VisionONE assists with platform-supported compliance workflows, but for legal or tax interpretation, we always recommend consulting a qualified tax advisor.)*\n\nWhich tax or invoicing processes are you currently looking to automate?";
  }

  if (prompt.includes("m-pesa") || prompt.includes("mpesa") || prompt.includes("paybill") || prompt.includes("till") || prompt.includes("stk")) {
    return "VisionONE provides comprehensive M-Pesa integration to streamline your collections and reconciliations, including:\n\n• STK Push payment initiation\n• PayBill and Till payment capture\n• Automated customer and invoice matching\n• Receipt generation & customer notifications\n• Unmatched payment handling, reversals, and exception approvals\n• Bank and general ledger reconciliation with audit trails\n\nAre you collecting customer payments primarily through PayBill, Till, or direct STK Push?";
  }

  if (prompt.includes("construction") || prompt.includes("contractor") || prompt.includes("project")) {
    return "Absolutely. VisionONE can help connect your construction operations across project accounting, procurement, inventory, finance, HR and reporting.\n\nIf you manage multiple projects, our cost-centre and project-level visibility allows you to track where money, materials, and workforce resources are going on each site.\n\nHow many active projects or sites are you currently managing?";
  }

  if (prompt.includes("inventory") || prompt.includes("stock") || prompt.includes("procurement") || prompt.includes("excel")) {
    return "Relying on spreadsheets or disconnected tools often becomes difficult as stock volumes, multiple locations, and purchasing requirements grow.\n\nVisionONE centralizes inventory, procurement workflows, purchase orders, stock visibility across branches, and inventory valuation into one connected platform. This ensures your operations and finance teams are always in sync.\n\nHow many stock locations or warehouses does your business operate?";
  }

  if (prompt.includes("hr") || prompt.includes("payroll") || prompt.includes("biometric") || prompt.includes("attendance") || prompt.includes("leave")) {
    return "VisionONE HR and Payroll manages your complete employee lifecycle with strong compliance controls:\n\n• Accurate payroll processing with statutory payroll controls\n• Biometric attendance integration & time tracking\n• Leave management and approval workflows\n• Employee Self-Service (ESS) on web and mobile\n• Detection of duplicate or suspicious employee records\n• Detailed payroll and audit reporting\n\nHow many employees does your organization currently process payroll for?";
  }

  if (prompt.includes("fleet") || prompt.includes("vehicle") || prompt.includes("truck")) {
    return "VisionONE Fleet Management supports organizations operating transport assets with vehicle records, operational monitoring, maintenance schedules, and fleet-related cost tracking.\n\nWhat is your current fleet size, and what is the biggest challenge you face in vehicle management today?";
  }

  if (prompt.includes("property") || prompt.includes("tenant") || prompt.includes("rent")) {
    return "VisionONE Property Management provides centralized management of property units, tenant records, lease agreements, rent invoicing (with M-Pesa capture), and facility maintenance expenses in one connected ledger.\n\nAre you managing commercial developments, residential units, or mixed-use portfolios?";
  }

  if (prompt.includes("manufacturing") || prompt.includes("production")) {
    return "For manufacturers, VisionONE unifies production-related operations, raw material inventory, procurement, cost-centre accounting, workforce attendance, and management reporting.\n\nThis gives leadership complete visibility into material consumption and production costs without juggling disconnected systems.\n\nWhat kind of manufacturing or assembly processes does your company run?";
  }

  if (prompt.includes("competitor") || prompt.includes("better than") || prompt.includes("sap") || prompt.includes("odoo") || prompt.includes("oracle") || prompt.includes("quickbooks")) {
    return "The right choice depends on your specific business requirements. VisionONE focuses on connecting finance, HR, inventory, procurement, compliance, and operational processes in one single platform, with tailored relevance for businesses operating in Kenya (including native eTIMS workflows and M-Pesa integration).\n\nWhat system are you currently using, and which areas feel disconnected?";
  }

  if (prompt.includes("demo") || prompt.includes("consultation") || prompt.includes("speak with sales")) {
    return "We would be glad to arrange a personalized VisionONE walkthrough for your team! A tailored demo allows you to see the exact modules—like Finance, Inventory, HR, or eTIMS—configured for your workflows.\n\nYou can click the 'Request a Demo' button above or let me know your company name, industry, and main requirements.";
  }

  return "Welcome to VisionONE Access. We help businesses achieve 'One Platform. Complete Business Visibility' by unifying Finance & Accounting, HR & Payroll, Inventory, Procurement, eTIMS, M-Pesa integration, and operational reporting.\n\nWhich area is causing you the most difficulty right now: finance, HR, inventory, procurement, or reporting?";
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
    company: "VisionONE Access",
    website: "https://www.visionerpsolutions.com/"
  });
});

// Demo Request Submission Endpoint
app.post("/api/demo-request", (req, res) => {
  const { name, email, phone, company, industry, companySize, currentSystem, mainChallenge, modulesOfInterest, additionalNotes } = req.body;

  if (!name || !email || !company) {
    res.status(400).json({ error: "Name, email, and company are required fields." });
    return;
  }

  const newRequest = {
    id: `REQ-${Date.now().toString(36).toUpperCase()}`,
    name,
    email,
    phone: phone || "Not provided",
    company,
    industry: industry || "General",
    companySize: companySize || "Unspecified",
    currentSystem: currentSystem || "Not specified",
    mainChallenge: mainChallenge || "General Inquiry",
    modulesOfInterest: Array.isArray(modulesOfInterest) ? modulesOfInterest : [],
    additionalNotes: additionalNotes || "",
    status: "Pending Review",
    createdAt: new Date().toISOString()
  };

  demoRequests.unshift(newRequest);

  res.json({
    success: true,
    message: "Thank you! Your demo request has been submitted to the VisionONE Access team. A specialist will review your requirements and reach out to schedule a tailored walkthrough.",
    requestId: newRequest.id
  });
});

// Retrieve Demo Requests (for demo tracking in UI)
app.get("/api/demo-requests", (_req, res) => {
  res.json({ requests: demoRequests });
});

// Chat Endpoint (server-side Gemini integration with safe fallback)
app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "A valid message string is required." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyValid = apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.length > 5;

  if (isKeyValid) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      // Prepare conversation contents
      // Gemini chats format: format past turns
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      for (const h of history) {
        if (h.role === "user" || h.role === "assistant") {
          contents.push({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }]
          });
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: VISIONONE_SYSTEM_PROMPT,
          temperature: 0.3,
          topP: 0.95
        }
      });

      const replyText = response.text || "";
      const suggestDemo = shouldInviteDemo(message, replyText);

      res.json({
        reply: replyText,
        source: "gemini",
        suggestDemo
      });
      return;
    } catch (err: any) {
      console.warn("Gemini API call failed, falling back to verified VisionONE knowledge engine:", err?.message || err);
      // Fall through to knowledge fallback
    }
  }

  // Grounded fallback response directly using verified facts
  const fallbackReply = generateKnowledgeFallbackResponse(message, history);
  const suggestDemo = shouldInviteDemo(message, fallbackReply);

  res.json({
    reply: fallbackReply,
    source: "knowledge_engine",
    suggestDemo
  });
});

// Vite middleware & production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VisionONE Access AI Assistant server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
