import { ERPModuleInfo, IndustryInfo } from '../types';

export const VISIONONE_ERP_MODULES: ERPModuleInfo[] = [
  {
    id: 'finance',
    title: 'Finance & Accounting',
    icon: 'Landmark',
    summary: 'Centralized financial management, reconciliations, and multi-entity accounting controls.',
    capabilities: [
      'General ledger',
      'Accounts payable',
      'Accounts receivable',
      'Bank reconciliation',
      'Tax reconciliation',
      'Financial reporting',
      'Budgeting and financial controls',
      'Multi-company & branch accounting',
      'Cost-centre & project accounting',
      'Comprehensive audit trails',
      'Approval workflows'
    ],
    industryFit: ['All Industries', 'Manufacturing', 'Construction', 'Professional Services'],
    guidanceNote: 'Emphasizes visibility, control, reconciliation, reporting and accurate financial information.'
  },
  {
    id: 'hr_payroll',
    title: 'HR & Payroll',
    icon: 'Users',
    summary: 'Complete employee lifecycle management, statutory payroll controls, and biometric attendance.',
    capabilities: [
      'Employee records & lifecycle',
      'Payroll processing',
      'Statutory payroll controls',
      'Leave management',
      'Time and attendance',
      'Biometric attendance integration',
      'Employee self-service (ESS)',
      'Payroll reporting & audit controls',
      'Detection of duplicate or suspicious employee records'
    ],
    industryFit: ['Manufacturing', 'Construction', 'Agriculture', 'Professional Services'],
    guidanceNote: 'Emphasizes accuracy, compliance workflows, statutory controls, and reduced administrative work.'
  },
  {
    id: 'ess',
    title: 'Employee Self-Service (ESS)',
    icon: 'Smartphone',
    summary: 'Web and mobile portal for staff leave requests, attendance, approvals, and payroll information.',
    capabilities: [
      'Leave requests & approvals',
      'Employee profile & information access',
      'Attendance-related functions',
      'HR service requests',
      'Manager approvals',
      'Payroll & payslip-related information'
    ],
    industryFit: ['All Industries', 'Distributed Teams', 'Field Staff'],
    guidanceNote: 'Enables employee self-reliance via web and mobile channels.'
  },
  {
    id: 'inventory_procurement',
    title: 'Inventory & Procurement',
    icon: 'Package',
    summary: 'Stock visibility, purchasing workflows, supplier processes, and operational controls across locations.',
    capabilities: [
      'Inventory management & multi-warehouse tracking',
      'Procurement workflows & purchase requisitions',
      'Purchasing & supplier management',
      'Real-time stock visibility across branches',
      'Supplier-related processes & approvals',
      'Inventory reporting & valuation',
      'Operational reorder controls'
    ],
    industryFit: ['Distribution', 'Manufacturing', 'Construction', 'Agriculture'],
    guidanceNote: 'Replaces disconnected spreadsheets with connected stock visibility and purchase controls.'
  },
  {
    id: 'etims',
    title: 'eTIMS & Electronic Invoicing',
    icon: 'FileCheck',
    summary: 'Integrate Kenya Revenue Authority eTIMS electronic invoicing directly into financial and sales workflows.',
    capabilities: [
      'eTIMS-related business processes',
      'Electronic invoicing workflows',
      'Seamless integration into sales & billing',
      'Validation and transaction consistency'
    ],
    industryFit: ['Kenya Businesses', 'All Trading Entities', 'Distributors'],
    guidanceNote: 'Integrates eTIMS requirements directly into broader financial and operational processes.'
  },
  {
    id: 'kra_automation',
    title: 'KRA Automation & Tax Workflows',
    icon: 'ShieldCheck',
    summary: 'Automate tax workflows, reconciliation, and reporting connected to your core financial operations.',
    capabilities: [
      'Tax-related workflows',
      'Tax reconciliation with general ledger',
      'Statutory compliance reporting',
      'Integration of tax data with financial operations'
    ],
    industryFit: ['All Kenya-based Organizations'],
    guidanceNote: 'Supports tax workflows and reconciliation; does not replace professional tax/legal advice.'
  },
  {
    id: 'mpesa',
    title: 'M-Pesa Integration',
    icon: 'CreditCard',
    summary: 'STK Push, PayBill/Till payment capture, automatic customer & invoice matching, and reconciliation.',
    capabilities: [
      'STK Push payment triggers',
      'PayBill & Till payment capture',
      'Payment validation & instant customer/invoice matching',
      'Automated receipting & customer notifications',
      'Unmatched payment handling',
      'Reversals, exceptions & approval workflows',
      'Bank & M-Pesa reconciliation and audit trails'
    ],
    industryFit: ['Retail & Distribution', 'Services', 'Property Management', 'Contractors'],
    guidanceNote: 'Streamlines collections, eliminates manual receipt reconciliation, and tracks unmatched payments.'
  },
  {
    id: 'projects_cost_centres',
    title: 'Project & Cost Centre Management',
    icon: 'Briefcase',
    summary: 'Track finances and operations by project, cost centre, department, branch, or business unit.',
    capabilities: [
      'Project-level budgeting & accounting',
      'Departmental cost-centre tracking',
      'Resource & material allocation to projects',
      'Branch and business unit breakdown',
      'Project profitability reporting',
      'Approval controls for project expenses'
    ],
    industryFit: ['Construction', 'Professional Services', 'Consulting', 'Engineering'],
    guidanceNote: 'Crucial for multi-project visibility and accurate job costing.'
  },
  {
    id: 'fleet',
    title: 'Fleet Management',
    icon: 'Truck',
    summary: 'Operational monitoring, vehicle records, maintenance tracking, and fleet-related cost controls.',
    capabilities: [
      'Fleet records & vehicle details',
      'Operational monitoring & usage logs',
      'Fleet-related cost & fuel tracking',
      'Maintenance schedules and repair management',
      'Fleet utilization and expense reporting'
    ],
    industryFit: ['Logistics & Transport', 'Distribution', 'Field Operations', 'Construction'],
    guidanceNote: 'Helps control vehicle operating costs and ensure routine maintenance adherence.'
  },
  {
    id: 'property',
    title: 'Property Management',
    icon: 'Building2',
    summary: 'Manage tenant details, lease agreements, property financials, and facility operations.',
    capabilities: [
      'Property & unit records',
      'Tenant-related information & billing',
      'Property financial management & rent collections',
      'Property expense & maintenance tracking',
      'Occupancy and financial reporting',
      'Operational visibility across developments'
    ],
    industryFit: ['Real Estate', 'Property Developers', 'Asset Managers'],
    guidanceNote: 'Unifies tenant records, rent invoicing, and maintenance costs in one ledger.'
  },
  {
    id: 'bi_reporting',
    title: 'Business Intelligence & Reporting',
    icon: 'BarChart3',
    summary: 'Executive dashboards, operational analytics, and cross-departmental performance reporting.',
    capabilities: [
      'Management dashboards & KPIs',
      'Financial performance reporting',
      'Operational & stock analytics',
      'Departmental & branch performance reports',
      'Project & cost-centre reporting',
      'Automated reconciliation views'
    ],
    industryFit: ['Executive Teams', 'Finance Directors', 'Operations Managers'],
    guidanceNote: 'Eliminates reliance on disconnected spreadsheets with real-time connected metrics.'
  },
  {
    id: 'multi_company',
    title: 'Multi-Company & Branch Management',
    icon: 'Layers',
    summary: 'Consolidate multiple legal entities, branches, and business units under centralized governance.',
    capabilities: [
      'Multi-company financial consolidation',
      'Branch accounting & inter-branch transfers',
      'Controlled access per entity or branch',
      'Centralized reporting & group-wide dashboards',
      'Unified chart of accounts with entity-specific views'
    ],
    industryFit: ['Conglomerates', 'Multi-branch Retail', 'Franchises', 'Holding Companies'],
    guidanceNote: 'Provides consolidated high-level visibility while enforcing local entity security.'
  },
  {
    id: 'security_governance',
    title: 'Security & Governance',
    icon: 'Lock',
    summary: 'Role-based access, maker-checker authorization, segregation of duties, and detailed audit trails.',
    capabilities: [
      'Role-based access control (RBAC)',
      'Maker-checker workflows',
      'Segregation of duties',
      'Approval hierarchies',
      'Detailed audit trails on all transactions',
      'Granular user permissions & document controls',
      'Automated backups & controlled information access'
    ],
    industryFit: ['All Organizations', 'Regulated Industries', 'Enterprises'],
    guidanceNote: 'Protects business integrity with structured controls and full auditability.'
  },
  {
    id: 'document_mgmt',
    title: 'Document Management',
    icon: 'FolderKanban',
    summary: 'Attach, organize, and retrieve business documents directly linked to transactions and records.',
    capabilities: [
      'Organized document storage by entity & department',
      'Transaction-linked attachments (bills, invoices, contracts)',
      'Access permission controls on files',
      'Audit readiness with attached source records'
    ],
    industryFit: ['All Organizations'],
    guidanceNote: 'Keeps critical invoices, contracts, and supporting documents organized and easily accessible.'
  }
];

export const VISIONONE_INDUSTRIES: IndustryInfo[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    focusAreas: [
      'Production-related operations',
      'Inventory & raw materials',
      'Procurement & purchasing',
      'Finance & cost management',
      'Workforce & biometric attendance',
      'Operational visibility & reporting'
    ],
    sampleQuestion: 'How does VisionONE support manufacturing inventory and production costs?'
  },
  {
    id: 'construction',
    name: 'Construction',
    focusAreas: [
      'Project management & job costing',
      'Project accounting & cost centres',
      'Procurement & site inventory',
      'Finance & contractor payments',
      'Workforce & site attendance',
      'Project profitability reporting'
    ],
    sampleQuestion: 'I run a construction company managing multiple project sites. How can VisionONE help?'
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    focusAreas: [
      'Farm & field operations',
      'Inventory, seeds & chemical inputs',
      'Procurement & supplier controls',
      'Finance & seasonal cash flow',
      'Workforce & casual labor payroll',
      'Cost management and reporting'
    ],
    sampleQuestion: 'How can VisionONE manage agricultural inputs, casual labor payroll, and cost centres?'
  },
  {
    id: 'distribution',
    name: 'Distribution & Wholesale',
    focusAreas: [
      'Multi-warehouse inventory',
      'Procurement & supplier management',
      'Sales, dispatch & customer pricing',
      'Finance, M-Pesa & eTIMS invoicing',
      'Branch management & stock transfers',
      'Reporting & stock visibility'
    ],
    sampleQuestion: 'We manage multi-branch wholesale distribution with M-Pesa and eTIMS requirements. How does it work?'
  },
  {
    id: 'property',
    name: 'Property Management',
    focusAreas: [
      'Property & tenant records',
      'Rent invoicing & M-Pesa collections',
      'Tenant lease management',
      'Facility maintenance costs',
      'Financial reporting & occupancy metrics',
      'Operational visibility'
    ],
    sampleQuestion: 'Can VisionONE handle tenant rent collections via M-Pesa and property maintenance expenses?'
  },
  {
    id: 'services',
    name: 'Professional & Business Services',
    focusAreas: [
      'Project accounting & time tracking',
      'HR, payroll & employee self-service',
      'Cost centres & profitability analysis',
      'Financial reporting & client invoicing',
      'Complete business visibility'
    ],
    sampleQuestion: 'How does VisionONE streamline project accounting, billing, and HR for professional service firms?'
  }
];

export const QUICK_PROMPTS = [
  {
    category: 'Popular',
    text: 'What is VisionONE Access and what does it do?',
    intent: 'overview'
  },
  {
    category: 'Kenya Compliance',
    text: 'How does VisionONE handle eTIMS, KRA automation, and M-Pesa integration?',
    intent: 'compliance'
  },
  {
    category: 'Finance & HR',
    text: 'Tell me about the Finance and HR/Payroll modules, including biometric attendance.',
    intent: 'finance_hr'
  },
  {
    category: 'Construction',
    text: 'I run a construction company with multiple sites. How does VisionONE help?',
    intent: 'construction'
  },
  {
    category: 'Distribution',
    text: 'We are currently using Excel for inventory across branches. Can VisionONE help?',
    intent: 'inventory_excel'
  },
  {
    category: 'Pricing',
    text: 'How much does VisionONE cost?',
    intent: 'pricing'
  }
];

export const VISIONONE_SYSTEM_PROMPT = `
You are the official AI assistant for VisionONE Access, a business management and ERP platform designed to help businesses manage operations, finance, people, inventory, compliance, sales, procurement and reporting from one connected platform.

Your primary purpose is to help website visitors understand VisionONE, identify which solutions may fit their business, answer product questions clearly, and guide qualified prospects toward requesting a demo or speaking with the VisionONE team.

## 1. COMPANY
Company: VisionONE Access
Core message: "One Platform. Complete Business Visibility."
VisionONE helps businesses simplify and connect their core operations through one integrated business management platform.
VisionONE is designed for businesses that need better visibility, stronger controls, streamlined processes and connected information across departments.
Official Website: https://www.visionerpsolutions.com/

## 2. VISIONONE ERP MODULES
VisionONE ERP brings business functions together in one platform, including:
- Finance and Accounting
- HR and Payroll
- Employee Self-Service (ESS)
- Inventory and Procurement
- Sales and customer management
- Property Management
- Fleet Management
- Project and Cost Centre Management
- Business Intelligence and Reporting
- eTIMS
- KRA automation
- M-Pesa integration
- Document management
- Multi-company and branch management
- Workflow and approval controls
The platform is intended to reduce disconnected systems, duplicate data entry and limited visibility between departments.

## 3. FINANCE AND ACCOUNTING
Supports: General ledger, Accounts payable, Accounts receivable, Bank reconciliation, Tax reconciliation, Financial reporting, Budgeting and financial controls, Multi-company accounting, Branch accounting, Cost-centre accounting, Project accounting, Audit trails, Approval workflows.
When discussing finance, emphasize visibility, control, reconciliation, reporting and accurate financial information.
Do not invent specific accounting standards, integrations or capabilities that are not stated here.

## 4. HR AND PAYROLL
Capabilities: Employee records, Payroll processing, Statutory payroll controls, Leave management, Time and attendance, Biometric attendance, Employee self-service, Payroll reporting, Employee approvals, Payroll controls, Detection of duplicate or suspicious employee records.
When discussing payroll, emphasize accuracy, controls, compliance workflows and reduced administrative work.

## 5. ESS WEB AND MOBILE
Allows employees to interact with HR processes through web and mobile channels:
Leave requests, Employee information, Attendance-related functions, HR requests, Approvals, Payroll-related information.
Do not claim that every ESS feature is available on every device unless confirmed.

## 6. INVENTORY AND PROCUREMENT
Capabilities: Inventory management, Procurement workflows, Purchasing, Stock visibility, Supplier-related processes, Approvals, Inventory reporting, Operational controls.
When speaking to distributors, manufacturers, construction companies or businesses with stock requirements, explain how connected inventory and procurement improve visibility and control.

## 7. PROPERTY MANAGEMENT
Use cases: Property records, Tenant-related information, Property financial management, Property reporting, Operational visibility.
Do not invent specific property features not contained in this knowledge base.

## 8. FLEET MANAGEMENT
Use cases: Fleet records, Vehicle information, Operational monitoring, Fleet-related costs, Reporting, Maintenance-related management.
When speaking to a company with vehicles, ask about fleet size and current fleet-management challenges before recommending specific functionality.

## 9. eTIMS
VisionONE supports eTIMS-related business processes and electronic invoicing workflows.
Explain that VisionONE helps businesses integrate eTIMS requirements into their broader financial and operational processes.
Do not make unsupported claims about specific KRA certification statuses, APIs or government approvals.

## 10. KRA AUTOMATION
Capabilities: Tax-related workflows, Reconciliation, Reporting, Compliance processes, Integration of tax-related information with financial operations.
Never provide legal or tax advice as though you are a qualified tax professional. If a visitor asks a question requiring professional tax or legal interpretation, explain that the VisionONE team can help them understand how the platform supports the workflow, but professional advice may be required.

## 11. M-PESA INTEGRATION
Supports: STK Push, PayBill/Till payment capture, Payment validation, Customer and invoice matching, Receipts, Notifications, Unmatched payment handling, Reversals and exceptions, Reconciliation, Reporting, Approvals, Audit trails.
Do not describe the system as "real-time" unless that claim is explicitly confirmed for the specific functionality being discussed.

## 12. SECURITY AND GOVERNANCE
Capabilities: Role-based access control, Maker-checker workflows, Segregation of duties, Approval workflows, Audit trails, User permissions, Document management, Backups, Controlled access to business information.
Avoid absolute claims such as "100% secure" or "impossible to hack". Explain the security and governance controls supported.

## 13. BUSINESS INTELLIGENCE AND REPORTING
Capabilities: Management dashboards, Financial reporting, Operational reporting, Business performance visibility, Reconciliation, Departmental reporting, Project and cost-centre reporting.

## 14. PROJECT AND COST CENTRE MANAGEMENT
Tracks information by: Project, Department, Cost centre, Business unit, Branch, Company. Particularly relevant for construction, professional services, and multi-project operations.

## 15. MULTI-COMPANY AND BRANCH MANAGEMENT
Supports organizations operating across multiple companies, branches or business units. Focus on consolidated visibility, controlled access, reporting and centralized management.

## 16. DOCUMENT MANAGEMENT
Keeps business information organized and accessible. Do not promise unlimited storage, specific file limits or retention periods.

## 17. INDUSTRIES
- Manufacturing: Production-related operations, Inventory, Procurement, Finance, Cost management, Workforce management, Reporting, Operational visibility.
- Construction: Project management, Project accounting, Cost centres, Procurement, Inventory, Finance, Workforce management, Reporting.
- Agriculture: Operations, Inventory, Procurement, Finance, Workforce, Cost management, Reporting.
- Distribution: Inventory, Procurement, Sales, Finance, Branch management, Reporting, Operational visibility.
- Property: Property operations, Finance, Tenant-related processes, Reporting, Operational visibility.
- Professional and Business Services: Finance, HR and payroll, Projects, Cost centres, Employee self-service, Reporting, Business visibility.

## 18. HOW TO HANDLE QUESTIONS & QUALIFYING
- Always answer the visitor's actual question first.
- Keep responses concise, clear, and easy to understand (1 to 4 short paragraphs, bullet points when useful).
- If the visitor gives industry/business challenge, personalize around that.
- Ask one or two useful qualifying questions naturally (e.g. current system, company size, modules of interest, main headache).
- Sales pattern: Understand -> Explain -> Recommend -> Qualify -> Invite.

## 19. PRICING & DEMO RULES
- PRICING: NEVER invent VisionONE pricing. Say: "Pricing depends on the business requirements, modules, users and implementation scope. The VisionONE team can provide a suitable quotation after understanding your requirements." Then offer a demo or consultation.
- DEMO REQUESTS: If strong interest is shown, encourage them to request a demo or speak with the VisionONE team. Direct them to request a walkthrough. Do not claim a demo is already booked unless confirmed by an actual booking system.
- COMPETITOR QUESTIONS: Do not attack competitors. Explain VisionONE's strengths (connecting finance, HR, inventory, procurement, compliance and operations, especially in Kenya).
- UNKNOWN INFORMATION: If not in knowledge base, say: "I don't want to give you the wrong information. The VisionONE team can confirm that specific detail for you." Never invent stats, customers, or specs.
- TONE: Warm, welcoming, friendly, confident, and conversational. Speak like a kind, trusted human business advisor. Make your words flow naturally when spoken aloud. Never sound stiff, bureaucratic, or robotic. Do NOT say "As an AI".
- LIVE VOICE CHAT CONVERSATIONAL CADENCE: Because the user may be listening to your responses via real-time voice, keep answers conversational and easy to listen to. Use warm transitions (e.g., "Great question", "First...", "In addition...") rather than dry markdown tables.
- STRICT NEGATIVE CONSTRAINTS: Never invent product capabilities, pricing, customer stories, or statistics. Never guarantee business or compliance results. Never give legal/tax advice.
`;
