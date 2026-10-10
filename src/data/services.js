// Service data for the site: catalog.json (parsed from servicelist.md) plus the presentation details
// servicelist.md does not carry — URL slugs, icons, colours, one-line summaries and Sinhala copy.
import catalog from './catalog.json';
import { Compass, Workflow, MessageSquareMore, BrainCircuit, Network, Plug, FileText, ChartLine, Palette, Globe, CodeXml, Smartphone, ShoppingCart, Store, CreditCard, Cloud, AtSign, ShieldCheck, Database, GraduationCap, BookOpen, Cpu, House, HeartPulse, Plane, Sprout, Truck, Factory, Landmark, Briefcase, Megaphone, UtensilsCrossed, Languages, Presentation, LifeBuoy, Bot, Server, Sparkles } from '@lucide/svelte';

export const SITE_URL = 'https://calcus.ai';
export const BRAND = 'Calcus AI';
// Registered company details and head office, shown in the footer and contact section and used in structured data.
export const COMPANY = {
 legalName: 'Calcusai (Pvt) Ltd',
 office: 'Calcus HQ',
 street: '21/2 Rajamahavihara Road',
 locality: 'Maharagama',
 region: 'Western Province',
 country: 'Sri Lanka',
 phone: '+94701840527',
 phoneDisplay: '+94 70 184 0527'
};
// Calcus AI's flagship project. Set url to its live address to show a "Visit ApilageAI" button.
export const APILAGE = { name: 'ApilageAI', url: '' };
export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.locality}, ${COMPANY.country}`;
export const COMPANY_MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS)}`;

const categoryExtras = {
 A: { slug: 'ai-automation', name: 'AI & Automation', si: 'AI සහ automation', tone: 'green', icon: Bot },
 B: { slug: 'software-web-apps', name: 'Software, Websites & Apps', si: 'Software, websites සහ apps', tone: 'blue', icon: CodeXml },
 C: { slug: 'cloud-infrastructure', name: 'Cloud, Infrastructure & Security', si: 'Cloud, hosting සහ security', tone: 'dark', icon: Server },
 D: { slug: 'education-technology', name: 'Education & Learning Technology', si: 'අධ්‍යාපන technology', tone: 'orange', icon: GraduationCap },
 E: { slug: 'iot-smart-systems', name: 'AI + IoT & Smart Systems', si: 'AI + IoT සහ smart systems', tone: 'green', icon: Cpu },
 F: { slug: 'industry-solutions', name: 'Industry-Specific Solutions', si: 'කර්මාන්ත වලට ගැලපෙන විසඳුම්', tone: 'blue', icon: Factory },
 G: { slug: 'marketing-growth', name: 'Marketing & Customer Growth', si: 'Marketing සහ customers වැඩි කරගන්න', tone: 'orange', icon: Megaphone },
 H: { slug: 'language-localization', name: 'Language, Accessibility & Localization', si: 'භාෂා සහ හැමෝටම ලේසි කරන විසඳුම්', tone: 'green', icon: Languages },
 I: { slug: 'training-support', name: 'Training & Managed Support', si: 'Training සහ දිගටම support', tone: 'dark', icon: LifeBuoy }
};

const serviceExtras = {
 '01': { slug: 'ai-consulting-digital-transformation', icon: Compass, summary: 'Find where AI genuinely helps your business, then plan, prototype and roll it out with a clear roadmap.', si: ['AI consulting සහ digital transformation', 'ඔයාගේ business එකට AI ඇත්තටම උදව් වෙන තැන් හොයලා, plan කරලා, prototype එකක් හදලා පටන් ගමු.'] },
 '02': { slug: 'business-automation-ai-workflows', icon: Workflow, summary: 'Automate invoices, follow-ups, bookings, reports and approvals so your team spends time on real work.', si: ['Business automation සහ AI workflows', 'Invoices, follow-ups, bookings, reports වගේ දවසේ වැඩ automatic කරලා team එකට වැදගත් දේට වෙලාව දෙමු.'] },
 '03': { slug: 'ai-chatbots-voice-assistants', icon: MessageSquareMore, summary: 'Sinhala, Tamil and English chatbots and voice assistants for your website, WhatsApp and phone line.', si: ['AI chatbots සහ voice assistants', 'Website, WhatsApp සහ phone එකට සිංහල, දෙමළ, ඉංග්‍රීසි chatbots සහ voice assistants.'] },
 '04': { slug: 'custom-ai-models-training', icon: BrainCircuit, summary: 'Custom and fine-tuned AI models, RAG knowledge systems and computer vision trained on your own data.', si: ['Custom AI models සහ training', 'ඔයාගේම data වලින් train කරපු AI models, RAG knowledge systems සහ image recognition.'] },
 '05': { slug: 'ai-agents-platform', icon: Network, summary: 'Specialist AI agents working together, managed from one dashboard with access controls and spending limits.', si: ['AI agents සහ agent platform', 'එකට වැඩ කරන AI agents, එක dashboard එකකින් control කරන්න — access සහ වියදම් limits එක්කම.'] },
 '06': { slug: 'ai-api-development-integration', icon: Plug, summary: 'Connect leading AI providers to your systems with secure, monitored and cost-controlled APIs.', si: ['AI API development සහ integration', 'ප්‍රසිද්ධ AI providers ඔයාගේ systems වලට secure, monitor කරන, වියදම් control කරන APIs එක්ක connect කරමු.'] },
 '07': { slug: 'ai-document-processing', icon: FileText, summary: 'Turn PDFs, invoices and forms into searchable data, summaries and company knowledge assistants.', si: ['AI document processing', 'PDFs, invoices, forms search කරන්න පුළුවන් data, summaries සහ company knowledge assistants බවට හරවමු.'] },
 '08': { slug: 'ai-decision-support-data-analytics', icon: ChartLine, summary: 'Dashboards, forecasts and analysis that help you decide on sales, stock, cash flow and risk.', si: ['AI data analytics සහ තීරණ ගන්න උදව්', 'Sales, stock, cash flow ගැන තීරණ ගන්න උදව් වෙන dashboards සහ forecasts.'] },
 '09': { slug: 'generative-ai-creative-solutions', icon: Palette, summary: 'AI-assisted design, marketing images, video, voiceovers and multilingual content for your brand.', si: ['Generative AI සහ creative වැඩ', 'ඔයාගේ brand එකට AI උදව්වෙන් designs, marketing images, videos, voiceovers සහ content.'] },
 '10': { slug: 'website-design-development', icon: Globe, summary: 'Fast, mobile-friendly websites in Sinhala, Tamil and English — for shops, schools, hotels, clinics and more.', si: ['Website design සහ development', 'Shops, schools, hotels, clinics වගේ ඕනම කෙනෙකුට වේගවත්, phone එකට ගැලපෙන websites — සිංහල, දෙමළ, ඉංග්‍රීසි.'] },
 '11': { slug: 'custom-software-development', icon: CodeXml, summary: 'Web, desktop and SaaS software built around how your business actually works.', si: ['Custom software development', 'ඔයාගේ business එක ඇත්තටම වැඩ කරන විදිහට හදපු web, desktop සහ SaaS software.'] },
 '12': { slug: 'mobile-app-development', icon: Smartphone, summary: 'Android, iOS and cross-platform apps with payments, notifications and app store publishing support.', si: ['Mobile app development', 'Payments, notifications එක්ක Android, iOS apps — app store එකට දාන්නත් උදව් කරනවා.'] },
 '13': { slug: 'ecommerce-online-selling', icon: ShoppingCart, summary: 'Online shops with LKR payments, WhatsApp orders, cash-on-delivery tracking and courier integrations.', si: ['E-commerce සහ online විකුණුම්', 'LKR payments, WhatsApp orders, cash-on-delivery tracking එක්ක online shops.'] },
 '14': { slug: 'business-management-systems', icon: Store, summary: 'POS, CRM, ERP, inventory, billing and payroll systems for shops, restaurants, salons and growing companies.', si: ['Business management systems', 'Shops, restaurants, salons වලට POS, CRM, inventory, billing සහ payroll systems.'] },
 '15': { slug: 'payment-billing-subscriptions', icon: CreditCard, summary: 'LKR and international payment gateways, LANKAQR-compatible options, subscriptions and automated reminders.', si: ['Payments, billing සහ subscriptions', 'LKR සහ international payment gateways, LANKAQR options, subscriptions සහ automatic reminders.'] },
 '16': { slug: 'cloud-vps-hosting', icon: Cloud, summary: 'Hosting, VPS and cloud servers set up, secured, backed up and monitored for you.', si: ['Cloud, VPS සහ hosting', 'Hosting, VPS සහ cloud servers set up කරලා, secure කරලා, backup කරලා අපිම බලාගන්නවා.'] },
 '17': { slug: 'domains-email-digital-setup', icon: AtSign, summary: '.lk and .com domains, business email, Google Workspace or Microsoft 365 and search indexing — set up properly.', si: ['Domains, email සහ digital setup', '.lk සහ .com domains, business email, Google Workspace හෝ Microsoft 365 — හරියට set up කරමු.'] },
 '18': { slug: 'cybersecurity-data-protection', icon: ShieldCheck, summary: 'Security reviews, access control, backups and Personal Data Protection Act readiness for your systems.', si: ['Cybersecurity සහ data protection', 'Security reviews, access control, backups සහ Personal Data Protection Act එකට ලෑස්ති වෙන්න උදව්.'] },
 '19': { slug: 'systems-integration-data-engineering', icon: Database, summary: 'Connect your apps, migrate data and turn spreadsheets into reliable software and dashboards.', si: ['Systems integration සහ data engineering', 'Apps එකට connect කරලා, data migrate කරලා, spreadsheets software සහ dashboards බවට හරවමු.'] },
 '20': { slug: 'learning-management-systems', icon: GraduationCap, summary: 'LMS platforms for schools, tuition classes, universities and staff training — exams, video lessons and certificates.', si: ['Learning management systems (LMS)', 'Schools, tuition classes, universities වලට exams, video lessons, certificates එක්ක LMS platforms.'] },
 '21': { slug: 'ai-education-syllabus-learning', icon: BookOpen, summary: 'Syllabus-aligned AI tutors for O/L and A/L students, practice questions and study plans reviewed by teachers.', si: ['AI අධ්‍යාපනය සහ syllabus learning', 'O/L සහ A/L ළමයින්ට syllabus එකට ගැලපෙන AI tutors, practice questions සහ study plans.'] },
 '22': { slug: 'ai-iot-smart-automation', icon: Cpu, summary: 'Smart sensors and AI for homes, offices, farms and factories — monitoring, alerts and remote control.', si: ['AI IoT සහ smart automation', 'ගෙවල්, offices, ගොවිපළ, factories වලට smart sensors — monitoring, alerts සහ remote control.'] },
 '23': { slug: 'ai-architecture-property-technology', icon: House, summary: 'AI home-layout ideas, 3D visualisation, property platforms and construction tracking dashboards.', si: ['AI architecture සහ property technology', 'AI ගෙවල් layout ideas, 3D visualisation, property platforms සහ construction tracking.'] },
 '24': { slug: 'healthcare-clinics-wellness', icon: HeartPulse, summary: 'Clinic appointments, queues, patient records, pharmacy stock and reminders — with privacy built in.', si: ['සෞඛ්‍ය, clinics සහ wellness', 'Clinic appointments, queues, patient records, pharmacy stock සහ reminders — privacy එක්කම.'] },
 '25': { slug: 'tourism-hotels-hospitality', icon: Plane, summary: 'Direct booking websites, reservation systems, tour itineraries and multilingual guest assistants.', si: ['Tourism, hotels සහ hospitality', 'Direct booking websites, reservations, tour itineraries සහ භාෂා කීපයකින් කතා කරන guest assistants.'] },
 '26': { slug: 'agriculture-fisheries-rural-technology', icon: Sprout, summary: 'Farm monitoring, smart irrigation, market prices and Sinhala and Tamil voice help for farmers.', si: ['කෘෂිකර්මය, ධීවර සහ ග්‍රාමීය technology', 'Farm monitoring, smart irrigation, වෙළඳපොළ මිල සහ ගොවියන්ට සිංහල, දෙමළ voice උදව්.'] },
 '27': { slug: 'logistics-delivery-transportation', icon: Truck, summary: 'Parcel tracking, delivery and fleet management, route planning and customer delivery updates.', si: ['Logistics, delivery සහ transport', 'Parcel tracking, delivery සහ fleet management, route planning සහ customersලට updates.'] },
 '28': { slug: 'manufacturing-wholesale-export', icon: Factory, summary: 'Production planning, factory inventory, quality control, export paperwork and B2B ordering portals.', si: ['Manufacturing, wholesale සහ export', 'Production planning, factory inventory, quality control, export documents සහ B2B ordering.'] },
 '29': { slug: 'government-ngo-community', icon: Landmark, summary: 'Citizen portals, complaint handling, beneficiary tracking and multilingual SMS and voice alerts.', si: ['රජය, NGOs සහ ප්‍රජා සංවිධාන', 'Citizen portals, පැමිණිලි handle කරන්න, beneficiary tracking සහ SMS, voice alerts.'] },
 '30': { slug: 'professional-services-hr', icon: Briefcase, summary: 'HR, payroll, recruitment and document systems for offices, accounting firms and law practices.', si: ['Professional services සහ HR', 'Offices, accounting firms, law practices වලට HR, payroll, recruitment සහ document systems.'] },
 '31': { slug: 'digital-marketing-seo', icon: Megaphone, summary: 'SEO and local search, landing pages, WhatsApp and email marketing automation and campaign dashboards.', si: ['Digital marketing සහ SEO', 'SEO, local search, landing pages, WhatsApp සහ email marketing automation.'] },
 '32': { slug: 'retail-restaurant-business-solutions', icon: UtensilsCrossed, summary: 'Billing, ordering, booking and membership systems for groceries, cafés, salons, gyms and tuition classes.', si: ['Retail, restaurants සහ එදිනෙදා business', 'Grocery, café, salon, gym, tuition classes වලට billing, ordering, booking systems.'] },
 '33': { slug: 'sinhala-tamil-english-solutions', icon: Languages, summary: 'Trilingual websites, apps, chatbots and voice tools built for Sinhala, Tamil and English speakers.', si: ['සිංහල, දෙමළ සහ ඉංග්‍රීසි විසඳුම්', 'සිංහල, දෙමළ, ඉංග්‍රීසි කතා කරන හැමෝටම websites, apps, chatbots සහ voice tools.'] },
 '34': { slug: 'ai-training-digital-skills', icon: Presentation, summary: 'Practical AI workshops for teams, teachers and SMEs — from prompt writing to automation skills.', si: ['AI training සහ digital skills', 'Teams, teachers සහ SMEs වලට practical AI workshops — prompts ලියන එකේ ඉඳන් automation දක්වා.'] },
 '35': { slug: 'technical-support-managed-services', icon: LifeBuoy, summary: 'Ongoing maintenance, monitoring, updates and SLA-based support for your websites, apps and AI systems.', si: ['Technical support සහ managed services', 'Websites, apps සහ AI systems වලට දිගටම maintenance, monitoring, updates සහ support.'] }
};

const packageExtras = {
 'Calcus Start': { slug: 'calcus-start', icon: Sparkles, tone: 'green', si: 'Business එක online ගෙනියන්න පටන් ගන්න', services: ['10', '17', '03', '35'] },
 'Calcus Commerce': { slug: 'calcus-commerce', icon: ShoppingCart, tone: 'orange', si: 'Online විකුණමු', services: ['13', '15', '14', '03'] },
 'Calcus Assist': { slug: 'calcus-assist', icon: MessageSquareMore, tone: 'blue', si: 'AI customer support', services: ['03', '33', '02'] },
 'Calcus Business OS': { slug: 'calcus-business-os', icon: Store, tone: 'dark', si: 'Business එකේ වැඩ එක තැනකින්', services: ['14', '02', '08', '30'] },
 'Calcus Edu': { slug: 'calcus-edu', icon: GraduationCap, tone: 'orange', si: 'Smart අධ්‍යාපනය', services: ['20', '21', '33'] },
 'Calcus Cloud': { slug: 'calcus-cloud', icon: Cloud, tone: 'blue', si: 'Hosting සහ infrastructure', services: ['16', '17', '18', '35'] },
 'Calcus Agents': { slug: 'calcus-agents', icon: Network, tone: 'dark', si: 'Developersලට AI agent platform එක', services: ['05', '06', '04'] },
 'Calcus Enterprise': { slug: 'calcus-enterprise', icon: Landmark, tone: 'green', si: 'ලොකු ආයතන වලට custom AI', services: ['01', '11', '19', '34'] },
 'Calcus Smart': { slug: 'calcus-smart', icon: Cpu, tone: 'green', si: 'IoT සහ smart monitoring', services: ['22', '26', '08'] }
};

const titleCase = text => text.toLowerCase().replace(/(^|[\s&+(,-])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\bAi\b/g, 'AI').replace(/\bIot\b/g, 'IoT');

export const categories = catalog.categories.map(category => {
 const extra = categoryExtras[category.letter];
 return {
  ...extra, letter: category.letter, fullName: titleCase(category.name),
  services: category.services.map(service => {
   const more = serviceExtras[service.number];
   return { number: service.number, title: service.title, items: service.items, notes: service.notes, slug: more.slug, icon: more.icon, summary: more.summary, siTitle: more.si[0], siSummary: more.si[1], category: category.letter };
  })
 };
});
export const services = categories.flatMap(category => category.services);
export const serviceBySlug = Object.fromEntries(services.map(service => [service.slug, service]));
export const serviceByNumber = Object.fromEntries(services.map(service => [service.number, service]));
export const categoryByLetter = Object.fromEntries(categories.map(category => [category.letter, category]));
export const packages = catalog.packages.map(pack => {
 const extra = packageExtras[pack.name];
 return { ...pack, ...extra, services: extra.services.map(number => serviceByNumber[number]) };
});
export const packagesForService = number => packages.filter(pack => pack.services.some(service => service.number === number));
export const why = catalog.why;
export const delivery = catalog.delivery;
export const customers = catalog.customers;
export const vision = catalog.vision;
export const serviceUrl = service => `/services/${service.slug}/`;

// Where Calcus AI works: every province and district, used for the coverage section and structured data.
export const provinces = [
 { name: 'Western', si: 'බස්නාහිර', districts: ['Colombo', 'Gampaha', 'Kalutara'] },
 { name: 'Central', si: 'මධ්‍යම', districts: ['Kandy', 'Matale', 'Nuwara Eliya'] },
 { name: 'Southern', si: 'දකුණ', districts: ['Galle', 'Matara', 'Hambantota'] },
 { name: 'Northern', si: 'උතුර', districts: ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'] },
 { name: 'Eastern', si: 'නැගෙනහිර', districts: ['Batticaloa', 'Ampara', 'Trincomalee'] },
 { name: 'North Western', si: 'වයඹ', districts: ['Kurunegala', 'Puttalam'] },
 { name: 'North Central', si: 'උතුරු මැද', districts: ['Anuradhapura', 'Polonnaruwa'] },
 { name: 'Uva', si: 'ඌව', districts: ['Badulla', 'Monaragala'] },
 { name: 'Sabaragamuwa', si: 'සබරගමුව', districts: ['Ratnapura', 'Kegalle'] }
];
