<script>
import { ArrowRight, Download, Phone, PhoneOff, Mic, Volume2, MapPin, Plus, Minus, Check, FileText, MessageCircle, Search, Bell, TrendingUp, Sparkles, SendHorizontal, Languages } from '@lucide/svelte';
import Seo from '../Seo.svelte';
import { reveal } from '../reveal.js';
import { lang } from '../i18n.js';
import { SITE_URL, COMPANY, COMPANY_ADDRESS } from '../data/services.js';

// Numbers behind the product mock-ups (shared by both languages). The teacher and students are fictional.
const data = {
 study: [11.2, 9.6, 4.1, 8.8, 6.3],
 paid: [true, true, false, true, false],
 // Paper class marks for one student against the class average, plotted on the grade analyser.
 marks: [58, 62, 61, 68, 71, 70, 76, 81],
 classAvg: [55, 57, 56, 60, 61, 60, 63, 64],
 topicScores: [88, 79, 71, 52],
 studyWeek: [6, 8, 5, 9, 7, 12, 10]
};
// Line-chart points for the grade analyser (marks 40–100 mapped into a 300×120 box).
const points = list => list.map((m,i)=>`${10+i*40},${110-(m-40)*1.6}`).join(' ');
const fitValues = [['inc','inc','inc'],['inc','inc','inc'],['inc','inc','inc'],['inc','inc','inc'],['inc','inc','inc'],['add','rec','rec'],['add','add','rec'],['add','add','add'],['add','add','add'],['add','rec','rec'],['add','add','rec'],['—','add','rec']];

// Every word on the page, in English and Sinhala — including the text inside the mock-ups.
// The Sinhala follows the rest of the site: friendly, keeping the English tech and class words teachers actually use.
const copy = {
 en: {
  switchTo: 'si', switchLabel: 'සිංහලෙන් බලන්න',
  crumbs: ['Home', 'Packages', 'For teachers'],
  eyebrow: 'Teacher website & tuition class management system · Sri Lanka',
  title: 'Put your class at the top.',
  lede: 'A professional website for your class, plus AI that analyses paper class marks, predicts A/L grades and answers your students in Sinhala, Tamil and English — trained on what you teach.',
  quote: 'Get a quote', brochure: 'Download brochure', printHelp: 'Choose “Save as PDF” in the print window to download the brochure.',
  site: { nav: ['Classes', 'Timetable', 'About'], register: 'Register', subject: 'A/L Combined Mathematics', headline: ['Clear concepts.', 'Confident exam answers.'], creds: 'BSc (Hons) Mathematics · 9 years teaching', view: 'View classes',
   classes: [['Sat · 8.00 am', '2026 A/L Theory', 'Maharagama'], ['Sun · 2.00 pm', '2025 A/L Revision', 'Nugegoda'], ['Wed · 6.30 pm', 'Paper class', 'Online']] },
  phone: { label: 'Grade analyser', predicted: 'Predicted', trend: 'Up 23 marks over 8 papers' },
  student: 'Sanduni Perera', studentShort: 'Sanduni', course: '2026 A/L · Combined Maths',
  facts: [['Starting price', 'LKR 80,000'], ['AI answers in', 'සිංහල · தமிழ் · English'], ['Trained on', 'Local syllabus & past papers'], ['Team', 'Based in Maharagama']],
  shows: [
   { num: '01 — AI mark & grade analyser', title: 'Know where every student stands before the exam does.',
     text: 'Enter your paper class marks and Calcus works out each student’s Z-score, tracks progress paper by paper and predicts a likely A/L grade — so you can push each student closer to the grade they need.',
     points: ['Z-scores calculated across your whole class', 'Predicted national exam grade for every student', 'Weak topics flagged from paper results', 'Class-wide view of who needs attention'],
     note: 'Predictions are estimates to guide revision, not guaranteed results.' },
   { num: '02 — Your own subject AI', title: 'An AI that teaches the way you do.',
     text: 'We train a custom AI model for your subject on what you’ve taught in class, the Sri Lankan syllabus and past papers. Students ask in Sinhala, Tamil or English and get answers in the same language — in your method, not a generic one.',
     points: ['Trained on your notes, tutes and paper classes', 'Follows the local syllabus and past paper style', 'Answers natively in Sinhala, Tamil and English', 'Available to your students day and night'] },
   { num: '03 — Answers that open your notes', title: 'Every answer comes with the page it came from.',
     text: 'When a student asks a question, the matching class note or PDF opens alongside the answer, at the right page. Students learn from your material, not just from the AI.',
     points: ['Your notes and PDFs open in a side panel', 'Jumps to the exact page and section', 'Links to past paper questions on the topic'] },
   { num: '04 — AI voice & call assistant', title: 'A study line students can simply call.',
     text: 'Students talk through academic questions or class matters with an AI voice assistant — by phone or in the app — in the language they’re most comfortable with.',
     points: ['Natural voice conversations about lessons', 'Answers class questions: timetable, fees, materials', 'Speaks Sinhala, Tamil and English', 'Call summaries for you to review'] },
   { num: '05 — Payments & study analytics', title: 'Fees collected. Study time measured.',
     text: 'Track who has paid and who hasn’t, and see how much time each student spends studying with your materials and AI — so you can step in before results slip.',
     points: ['Student payment records and dues', 'Weekly study time per student', 'Spot students who are falling behind', 'Reports for you and for parents'] }
  ],
  analyser: { marks: 'Paper class marks', avg: 'Class average', papers: 'Papers 1–8', grade: 'Predicted A/L grade', range: 'Likely range B – A', top: 'Top 12% of class', topics: ['Calculus', 'Vectors', 'Statics', 'Projectiles'] },
  chat: { name: 'Combined Maths AI', by: 'Trained on Kavindi’s classes', notes: 'Your notes · Integration Pt 2', ask: 'Ask in Sinhala, Tamil or English…' },
  split: { q: 'Can you explain Q7 from last week’s paper?', a: 'Q7 uses integration by parts twice. I’ve opened the method from your class notes — see the highlighted example.', follow: 'Ask a follow-up…', page: 'p. 4 / 12', heading: '4.2 Integration by parts', example: 'Example 3 — repeated integration by parts' },
  voice: { line: 'Maths study line', who: 'AI assistant · 02:41', quote: '“For projectiles, start by splitting the velocity into horizontal and vertical parts…”', summary: 'Call summary', topic: 'Projectile motion — max height', summaryText: 'Explained resolving velocity; suggested Paper 6, Q4 for practice.', meta: 'Nethmi · 12 min · Sinhala' },
  pay: { title: 'Payments & study time', search: 'Search', stats: [['Collected', '412k'], ['Fees due', '11'], ['Avg study', '8.6h'], ['Active today', '63']], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], cols: ['Student', 'Study / week', 'Fee'], paid: 'Paid', due: 'Due',
   students: ['Sanduni Perera', 'Hasitha Fernando', 'Nethmi Silva', 'Ravindu Bandara', 'Ishara Wickramasinghe'] },
  includedTitle: 'What’s in the package', includedText: 'Everything below is included as standard. The number of classes, users, pages and initial materials is agreed in your quote.',
  included: [
   ['Teacher website', 'Profile, qualifications, subjects, teaching approach, timetable and contact details — designed for phones first.'],
   ['Class pages & enquiries', 'A page for each class, a registration enquiry form and a WhatsApp button so parents can reach you directly.'],
   ['Students & attendance', 'Student directory, class groups and enrolment records, with attendance marked per class in one private admin area.'],
   ['Learning materials', 'Upload notes and worksheets, and link your existing lesson videos, organised by class.'],
   ['Fees & reports', 'Record class fees and payment status, with simple student, attendance and fee reports.'],
   ['Launch & training', 'Setup with your supplied content, basic search engine setup, admin training and a handover guide.']
  ],
  fitTitle: 'Sized to how you teach', fitText: 'One package, scoped differently for a single teacher, a growing class or a full institute.',
  feature: 'Feature', tiers: ['Individual teacher', 'Tuition class', 'Institute'],
  fit: ['Teacher website & class pages', 'Enquiry form & WhatsApp contact', 'Student records & attendance', 'Learning materials', 'Fee records & reports', 'AI mark & grade analyser with Z-scores', 'Subject AI trained on your classes', 'Notes side panel in AI answers', 'AI voice & call assistant', 'Payment management & study-time analytics', 'Student logins, exams & assignments (LMS)', 'Multiple teachers & branches'],
  fitLabel: { inc: 'Included', add: 'Add-on', rec: 'Recommended', '—': 'Not needed' },
  stepsTitle: 'How we work with you', stepsText: 'A clear scope and price up front, and you see the site before it goes live.', step: 'Step',
  steps: [
   ['Consultation', 'We talk through your subjects, classes, student numbers and what you want to manage online. You get a written scope and a fixed quote.'],
   ['Design, content & AI setup', 'We design your site around your teaching brand, load your class details, and prepare your notes, papers and syllabus material for any AI features you choose.'],
   ['Build & review', 'We build the website, admin area and AI tools, then walk you through them so you can test answers and request changes before launch.'],
   ['Launch & training', 'We put the site live, train you (and any staff) on the admin area and hand over a short guide for day-to-day use.']
  ],
  extrasTitle: 'Add when you’re ready', extrasText: 'Optional upgrades, scoped and priced separately.',
  extras: [
   ['Learning management system', 'Student logins, structured courses, assignments, online exams, marking and progress tracking.'],
   ['Online payment gateway', 'Card and online payments with receipts and automated fee reminders. Payment provider fees are separate.'],
   ['AI practice questions', 'Teacher-reviewed practice questions generated from the syllabus, past papers and your own class material.'],
   ['Sinhala, Tamil & English', 'Additional language versions of your website, materials and student experience.'],
   ['Institute & branch management', 'Multiple teachers, staff access, branches, schedules and consolidated reporting.'],
   ['Growth & ongoing care', 'Social content, campaign support, hosting, maintenance, backups and technical support.']
  ],
  faqTitle: 'Questions teachers ask', faqSub: 'Something else? Call us on',
  faqs: [
   ['What does the LKR 80,000 cover?', 'It is the starting price for the standard package: the teacher website and the admin area for students, attendance, materials and fees, plus setup and training. The final price depends on your number of classes, students, pages and features, and is agreed with you before work begins.'],
   ['Are there any recurring costs?', 'Some services carry ongoing or usage-based costs — for example your domain name, hosting, video storage, SMS or WhatsApp messaging, payment processing and AI usage. We list every cost that applies to your setup in your quote.'],
   ['How are the A/L grade predictions worked out?', 'The analyser uses each student’s paper class marks, compares them with the rest of your class using Z-scores, and estimates a likely grade range. Predictions are a guide for revision planning, not a guaranteed result — they become more reliable as more papers are marked.'],
   ['What does the subject AI learn from?', 'From what you teach: your class notes, tutes and papers, together with the Sri Lankan syllabus and past papers for your subject. It answers students in Sinhala, Tamil or English, and you can review its answers before it goes live.'],
   ['Does it work for O/L, scholarship and online classes too?', 'Yes. The website, student records, attendance, materials and fee features work for any class — Grade 5 scholarship, O/L, A/L, university, language, music or online classes, for individual tutors and tuition institutes anywhere in Sri Lanka. Z-scores and grade predictions are built around A/L; for other exams the analyser tracks marks and each student’s standing in the class.'],
   ['Can the website be in Sinhala or Tamil?', 'Yes. Sinhala, Tamil and English versions are available as an optional extra for the website, materials and student experience.'],
   ['I run a small class. Is this too much for me?', 'No. The package is scoped to your size, and pricing is negotiable. Many teachers start with the website and student records and add features later.']
  ],
  ctaTitle: 'Tell us about your classes.', ctaText: 'Share your subjects, student numbers and what you’d like to manage online. We’ll come back with a scope and a quote — from LKR 80,000.', ctaButton: 'Request a quote'
 },
 si: {
  switchTo: 'en', switchLabel: 'View in English',
  crumbs: ['මුල් පිටුව', 'Packages', 'ගුරුවරුන්ට'],
  eyebrow: 'ගුරුවරුන්ට website සහ tuition පන්ති management system · ශ්‍රී ලංකාව',
  title: 'ඔයාගේ පන්තිය top එකටම ගේමු.',
  lede: 'ඔයාගේ පන්තියට professional website එකක්. ඒ එක්කම paper class marks analyse කරලා A/L grade එක predict කරන, ඔයා උගන්වන දේ වලින්ම train කරපු, සිංහල, දෙමළ, ඉංග්‍රීසි තුනෙන්ම ළමයින්ට උත්තර දෙන AI එකක්.',
  quote: 'Quote එකක් ගන්න', brochure: 'Brochure එක download කරන්න', printHelp: 'Print window එකේ “Save as PDF” තෝරලා brochure එක download කරගන්න.',
  site: { nav: ['පන්ති', 'කාලසටහන', 'මා ගැන'], register: 'ලියාපදිංචි වන්න', subject: 'A/L සංයුක්ත ගණිතය', headline: ['පැහැදිලි සංකල්ප.', 'විශ්වාසයෙන් විභාගයට.'], creds: 'BSc (Hons) ගණිතය · අවුරුදු 9ක අත්දැකීම්', view: 'පන්ති බලන්න',
   classes: [['සෙන · පෙ.ව. 8.00', '2026 A/L Theory', 'මහරගම'], ['ඉරි · ප.ව. 2.00', '2025 A/L Revision', 'නුගේගොඩ'], ['බදා · ප.ව. 6.30', 'Paper class', 'Online']] },
  phone: { label: 'Grade analyser', predicted: 'Predict කළ', trend: 'Papers 8කින් ලකුණු 23ක් වැඩි වුණා' },
  student: 'සඳුනි පෙරේරා', studentShort: 'සඳුනි', course: '2026 A/L · සංයුක්ත ගණිතය',
  facts: [['පටන් ගන්න මිල', 'LKR 80,000'], ['AI උත්තර දෙන භාෂා', 'සිංහල · தமிழ் · English'], ['Train කරන්නේ', 'ලංකාවේ syllabus සහ past papers'], ['කණ්ඩායම', 'මහරගම ඉඳන්']],
  shows: [
   { num: '01 — AI marks සහ grade analyser', title: 'විභාගයට කලින්ම හැම ළමයෙක්ම ඉන්න තැන දැනගන්න.',
     text: 'Paper class marks දැම්මම Calcus එකෙන් හැම ළමයෙකුගෙම Z-score එක හදනවා, paper එකෙන් paper එකට progress එක track කරනවා, A/L එකේ ලැබෙන්න පුළුවන් grade එක predict කරනවා. ඒ නිසා හැම ළමයෙක්ම ඕන කරන grade එකට ළං කරන්න ඔයාට පුළුවන්.',
     points: ['මුළු පන්තියටම Z-scores ගණනය කරනවා', 'හැම ළමයෙකුටම ජාතික විභාගයේ grade එක predict කරනවා', 'Paper results වලින් දුර්වල topics පෙන්නනවා', 'අවධානය ඕන කාටද කියලා මුළු පන්තියම එක බැල්මෙන්'],
     note: 'Predictions කියන්නේ revision වලට මඟ පෙන්වන ඇස්තමේන්තු විතරයි, සහතික කරපු ප්‍රතිඵල නෙවෙයි.' },
   { num: '02 — ඔයාගේම subject AI', title: 'ඔයා උගන්වන විදිහටම උගන්වන AI එකක්.',
     text: 'ඔයා පන්තියේ උගන්වපු දේ, ලංකාවේ syllabus එක සහ past papers වලින් ඔයාගේ subject එකට වෙනම AI model එකක් අපි train කරනවා. ළමයි සිංහලෙන්, දෙමළෙන් හරි ඉංග්‍රීසියෙන් හරි ඇහුවම ඒ භාෂාවෙන්ම උත්තර දෙනවා — වෙන කාගේවත් විදිහට නෙවෙයි, ඔයාගේ method එකට.',
     points: ['ඔයාගේ notes, tutes, paper classes වලින් train කරනවා', 'ලංකාවේ syllabus එකටයි past paper style එකටයි ගැලපෙනවා', 'සිංහල, දෙමළ, ඉංග්‍රීසි තුනෙන්ම natively උත්තර දෙනවා', 'ළමයින්ට දවල් රෑ ඕන වෙලාවක'] },
   { num: '03 — ඔයාගේ notes open කරන උත්තර', title: 'හැම උත්තරයක් එක්කම ඒක ආපු page එකත්.',
     text: 'ළමයෙක් ප්‍රශ්නයක් ඇහුවම, ඊට ගැලපෙන class note එක හරි PDF එක හරි උත්තරය ළඟින්ම, හරි page එකෙන්ම open වෙනවා. ළමයි ඉගෙන ගන්නේ AI එකෙන් විතරක් නෙවෙයි, ඔයාගේ materials වලින්.',
     points: ['ඔයාගේ notes සහ PDFs side panel එකක open වෙනවා', 'හරියටම අදාළ page එකට, section එකට යනවා', 'ඒ topic එකේ past paper ප්‍රශ්න වලට links'] },
   { num: '04 — AI voice සහ call assistant', title: 'ළමයින්ට කෙලින්ම call කරන්න පුළුවන් study line එකක්.',
     text: 'පාඩම් ගැන ප්‍රශ්න හරි පන්තියේ දේවල් හරි AI voice assistant එකත් එක්ක ළමයින්ට කතා කරන්න පුළුවන් — phone එකෙන් හරි app එකෙන් හරි, තමන්ට ලේසිම භාෂාවෙන්.',
     points: ['පාඩම් ගැන ස්වභාවික voice කතාබහ', 'Timetable, fees, materials වගේ පන්තියේ ප්‍රශ්න වලට උත්තර', 'සිංහල, දෙමළ, ඉංග්‍රීසි කතා කරනවා', 'ඔයාට බලන්න call summaries'] },
   { num: '05 — Payments සහ study analytics', title: 'Fees එකතු වෙනවා. පාඩම් කරන කාලය මනිනවා.',
     text: 'කවුද ගෙව්වේ, කවුද නැත්තේ කියලා track කරන්න. ඒ වගේම ඔයාගේ materials සහ AI එක්ක හැම ළමයෙක්ම කොච්චර වෙලාවක් පාඩම් කරනවද කියලා බලලා, results අඩු වෙන්න කලින්ම මැදිහත් වෙන්න.',
     points: ['ළමයින්ගේ payment records සහ හිඟ මුදල්', 'හැම ළමයෙකුගෙම සතියේ study time', 'පිටිපස්සට යන ළමයි ඉක්මනින් අඳුනගන්න', 'ඔයාටයි දෙමව්පියන්ටයි reports'] }
  ],
  analyser: { marks: 'Paper class ලකුණු', avg: 'පන්තියේ සාමාන්‍යය', papers: 'Papers 1–8', grade: 'Predict කළ A/L grade', range: 'ලැබිය හැකි පරාසය B – A', top: 'පන්තියේ ඉහළම 12%', topics: ['කලනය', 'දෛශික', 'ස්ථිතිකය', 'ප්‍රක්ෂිප්ත'] },
  chat: { name: 'සංයුක්ත ගණිත AI', by: 'කවිඳි miss ගේ පන්ති වලින් train කළා', notes: 'පන්ති notes · අනුකලනය 2', ask: 'සිංහලෙන්, දෙමළෙන් හරි English වලින් අහන්න…' },
  split: { q: 'පහුගිය සතියේ paper එකේ Q7 කියලා දෙන්න පුළුවන්ද?', a: 'Q7 වලට කොටස් වශයෙන් අනුකලනය දෙපාරක් යොදනවා. පන්ති notes වල ඒ ක්‍රමය open කළා — highlight කරපු උදාහරණය බලන්න.', follow: 'තව දෙයක් අහන්න…', page: 'පිටුව 4 / 12', heading: '4.2 කොටස් වශයෙන් අනුකලනය', example: 'උදාහරණය 3 — දෙවරක් කොටස් වශයෙන් අනුකලනය' },
  voice: { line: 'ගණිත study line', who: 'AI assistant · 02:41', quote: '“ප්‍රක්ෂිප්ත වලදී, මුලින්ම ප්‍රවේගය තිරස් සහ සිරස් සංරචක වලට වෙන් කරන්න…”', summary: 'Call සාරාංශය', topic: 'ප්‍රක්ෂිප්ත චලිතය — උපරිම උස', summaryText: 'ප්‍රවේගය විභේදනය කරන හැටි පැහැදිලි කළා; practice වලට Paper 6, Q4 යෝජනා කළා.', meta: 'නෙත්මි · විනාඩි 12 · සිංහල' },
  pay: { title: 'Payments සහ study time', search: 'හොයන්න', stats: [['එකතු වුණු', '412k'], ['හිඟ fees', '11'], ['සාමාන්‍ය study', '8.6h'], ['අද active', '63']], days: ['සඳු', 'අඟ', 'බදා', 'බ්‍රහ', 'සිකු', 'සෙන', 'ඉරි'], cols: ['ශිෂ්‍යයා', 'Study / සතියට', 'Fee'], paid: 'ගෙව්වා', due: 'හිඟයි',
   students: ['සඳුනි පෙරේරා', 'හසිත ප්‍රනාන්දු', 'නෙත්මි සිල්වා', 'රවිඳු බණ්ඩාර', 'ඉෂාර වික්‍රමසිංහ'] },
  includedTitle: 'Package එකේ තියෙන දේවල්', includedText: 'පහළ තියෙන හැමදේම standard විදිහටම තියෙනවා. පන්ති, users, pages සහ මුලින් දාන materials ගණන quote එකේදී එකඟ වෙනවා.',
  included: [
   ['ගුරු website එක', 'Profile, සුදුසුකම්, subjects, උගන්වන විදිහ, timetable සහ contact details — phone එකට මුලින්ම design කරලා.'],
   ['පන්ති pages සහ විමසීම්', 'හැම පන්තියකටම page එකක්, registration enquiry form එකක් සහ දෙමව්පියන්ට කෙලින්ම කතා කරන්න WhatsApp button එකක්.'],
   ['ළමයි සහ පැමිණීම', 'Student directory, class groups සහ enrolment records, පන්තියෙන් පන්තියට attendance දාන්න පුළුවන් private admin area එකක.'],
   ['ඉගෙනුම් materials', 'Notes, worksheets upload කරන්න, දැනට තියෙන lesson videos link කරන්න — පන්තිය අනුව පිළිවෙළට.'],
   ['Fees සහ reports', 'පන්ති fees සහ ගෙවීම් තත්ත්වය record කරලා, ළමයි, attendance, fees ගැන සරල reports.'],
   ['Launch සහ training', 'ඔයා දෙන content එකෙන් setup කරලා, මූලික search engine setup, admin training සහ handover guide එකක්.']
  ],
  fitTitle: 'ඔයා උගන්වන විදිහට ගැලපෙන්න', fitText: 'එකම package එක — තනි ගුරුවරයෙකුට, වැඩෙන පන්තියකට, නැත්නම් මුළු ආයතනයකට ගැලපෙන්න scope කරනවා.',
  feature: 'විශේෂාංගය', tiers: ['තනි ගුරුවරයා', 'Tuition පන්තිය', 'ආයතනය'],
  fit: ['ගුරු website සහ පන්ති pages', 'Enquiry form සහ WhatsApp contact', 'Student records සහ attendance', 'ඉගෙනුම් materials', 'Fee records සහ reports', 'Z-scores එක්ක AI marks සහ grade analyser', 'ඔයාගේ පන්ති වලින් train කරපු subject AI', 'AI උත්තර වල notes side panel', 'AI voice සහ call assistant', 'Payment management සහ study-time analytics', 'Student logins, exams, assignments (LMS)', 'ගුරුවරු කිහිපදෙනෙක් සහ branches'],
  fitLabel: { inc: 'ඇතුළත්', add: 'Add-on', rec: 'නිර්දේශිතයි', '—': 'ඕන නෑ' },
  stepsTitle: 'අපි ඔයාත් එක්ක වැඩ කරන විදිහ', stepsText: 'මුලින්ම පැහැදිලි scope එකක් සහ මිලක්. Live යන්න කලින් ඔයාට site එක බලන්න පුළුවන්.', step: 'පියවර',
  steps: [
   ['කතාබහ', 'ඔයාගේ subjects, පන්ති, ළමයි ගණන, online manage කරන්න ඕන දේවල් ගැන කතා කරනවා. ලිඛිත scope එකක් සහ fixed quote එකක් ලැබෙනවා.'],
   ['Design, content සහ AI setup', 'ඔයාගේ teaching brand එකට ගැලපෙන්න site එක design කරලා, පන්ති විස්තර දාලා, ඔයා තෝරන AI features වලට notes, papers, syllabus materials සූදානම් කරනවා.'],
   ['හදලා review කිරීම', 'Website එක, admin area එක සහ AI tools හදලා ඔයාට පෙන්නනවා — launch කරන්න කලින් උත්තර test කරලා වෙනස්කම් ඉල්ලන්න පුළුවන්.'],
   ['Launch සහ training', 'Site එක live කරලා, ඔයාට (සහ staff එකට) admin area එක ගැන training දීලා, දවසින් දවස පාවිච්චියට කෙටි guide එකක් දෙනවා.']
  ],
  extrasTitle: 'ලෑස්ති වුණාම එකතු කරන්න', extrasText: 'අමතර upgrades — වෙනම scope කරලා මිල කරනවා.',
  extras: [
   ['Learning management system', 'Student logins, structured courses, assignments, online exams, marking සහ progress tracking.'],
   ['Online payment gateway', 'Receipts සහ automatic fee reminders එක්ක card සහ online payments. Payment provider ගාස්තු වෙනම.'],
   ['AI practice questions', 'Syllabus, past papers සහ ඔයාගේම class materials වලින් හදන, ගුරුවරයා review කරපු practice ප්‍රශ්න.'],
   ['සිංහල, දෙමළ සහ ඉංග්‍රීසි', 'ඔයාගේ website, materials සහ student experience එකට අමතර භාෂා versions.'],
   ['ආයතන සහ branch management', 'ගුරුවරු කිහිපදෙනෙක්, staff access, branches, schedules සහ එකතු කළ reporting.'],
   ['Growth සහ දිගටම care', 'Social content, campaign support, hosting, maintenance, backups සහ technical support.']
  ],
  faqTitle: 'ගුරුවරු අහන ප්‍රශ්න', faqSub: 'වෙන මොනවා හරි අහන්න තියෙනවද? අපිට call කරන්න',
  faqs: [
   ['LKR 80,000 න් cover වෙන්නේ මොනවද?', 'ඒක standard package එකේ පටන් ගන්න මිල: ගුරු website එකයි, ළමයි, attendance, materials, fees වලට admin area එකයි, setup සහ training එක්ක. අවසාන මිල පන්ති, ළමයි, pages සහ features ගණන අනුව වෙනස් වෙනවා — වැඩ පටන් ගන්න කලින් ඔයාත් එක්ක එකඟ වෙනවා.'],
   ['දිගටම ගෙවන්න වෙන ගාස්තු තියෙනවද?', 'සමහර සේවා වලට දිගටම හරි පාවිච්චිය අනුව හරි ගාස්තු තියෙනවා — උදාහරණයක් විදිහට domain name, hosting, video storage, SMS හරි WhatsApp messaging, payment processing සහ AI usage. ඔයාගේ setup එකට අදාළ හැම ගාස්තුවක්ම quote එකේ පෙන්නනවා.'],
   ['A/L grade predictions හදන්නේ කොහොමද?', 'Analyser එක හැම ළමයෙකුගෙම paper class marks අරන්, Z-scores පාවිච්චි කරලා පන්තියේ අනිත් අය එක්ක සසඳලා, ලැබෙන්න පුළුවන් grade පරාසයක් ඇස්තමේන්තු කරනවා. Predictions කියන්නේ revision plan කරන්න මඟ පෙන්වීමක් විතරයි, සහතික කරපු ප්‍රතිඵලයක් නෙවෙයි — papers වැඩිපුර mark කරන තරමට වඩා විශ්වාසදායක වෙනවා.'],
   ['Subject AI එක ඉගෙන ගන්නේ මොනවගෙන්ද?', 'ඔයා උගන්වන දේවල් වලින්: ඔයාගේ class notes, tutes, papers, ඒ එක්කම ඔයාගේ subject එකේ ලංකාවේ syllabus එක සහ past papers. ළමයින්ට සිංහල, දෙමළ හරි ඉංග්‍රීසි වලින් උත්තර දෙනවා. Live යන්න කලින් ඔයාට ඒ උත්තර review කරන්න පුළුවන්.'],
   ['O/L, scholarship, online පන්ති වලටත් මේක හරියනවද?', 'ඔව්. Website, student records, attendance, materials සහ fees features ඕනම පන්තියකට වැඩ කරනවා — 5 ශ්‍රේණිය ශිෂ්‍යත්ව, O/L, A/L, university, භාෂා, සංගීත හරි online පන්ති, ලංකාවේ ඕනම තැනක ඉන්න තනි ගුරුවරුන්ට සහ tuition ආයතන වලට. Z-scores සහ grade predictions හදලා තියෙන්නේ A/L වලට; අනිත් විභාග වලට analyser එකෙන් marks සහ පන්තියේ හැම ළමයෙක්ම ඉන්න තැන track කරනවා.'],
   ['Website එක සිංහලෙන් හරි දෙමළෙන් හරි තියෙන්න පුළුවන්ද?', 'ඔව්. Website, materials සහ student experience එකට සිංහල, දෙමළ, ඉංග්‍රීසි versions optional extra එකක් විදිහට ගන්න පුළුවන්.'],
   ['මම කරන්නේ පොඩි පන්තියක්. මේක මට වැඩිද?', 'නෑ. Package එක ඔයාගේ size එකට scope කරනවා, මිල ගැන කතා කරලා එකඟ වෙන්නත් පුළුවන්. ගොඩක් ගුරුවරු website එකයි student records ටිකයි එක්ක පටන් අරන් පස්සේ features එකතු කරනවා.']
  ],
  ctaTitle: 'ඔයාගේ පන්ති ගැන අපිට කියන්න.', ctaText: 'ඔයාගේ subjects, ළමයි ගණන, online manage කරන්න ඕන දේවල් share කරන්න. Scope එකක් සහ quote එකක් එක්ක අපි ආපහු එන්නම් — LKR 80,000 සිට.', ctaButton: 'Quote එකක් ඉල්ලන්න'
 }
};
const c = $derived(copy[$lang] ?? copy.en);

let printHelp = $state(false);
function exportPdf(){ printHelp = true; window.print(); }

// Structured data stays in English, matching the pre-rendered page search engines read.
const pageUrl = SITE_URL+'/packages/for-teachers/';
const jsonLd = [
 {'@type':'WebPage','@id':pageUrl+'#webpage',url:pageUrl,name:'Teacher Website & Tuition Class Management System in Sri Lanka',inLanguage:'en',isPartOf:{'@id':SITE_URL+'/#website'},about:{'@id':pageUrl+'#service'},
  primaryImageOfPage:{'@type':'ImageObject',url:SITE_URL+'/og-teachers.jpg',width:1200,height:630},breadcrumb:{'@id':pageUrl+'#breadcrumb'}},
 {'@type':'Service','@id':pageUrl+'#service',name:'Teacher & tuition class package',alternateName:['Teacher website Sri Lanka','Tuition class management system','Tuition class app','Class management system for teachers'],
  serviceType:'Teacher website and tuition class management system',url:pageUrl,image:SITE_URL+'/og-teachers.jpg',provider:{'@id':SITE_URL+'/#organization'},
  description:'A professional website and class management system for teachers, tutors and tuition institutes in Sri Lanka: class pages and enquiries, student records, attendance, learning materials and fees, with optional AI — a paper class mark and grade analyser with Z-scores and A/L grade predictions, a subject AI trained on your own classes that answers students in Sinhala, Tamil and English, an AI voice assistant, and payment and study-time analytics.',
  audience:{'@type':'EducationalAudience',educationalRole:'teacher',audienceType:'Teachers, private tutors and tuition institutes'},
  areaServed:{'@type':'Country',name:'Sri Lanka'},availableLanguage:['English','Sinhala','Tamil'],
  offers:{'@type':'Offer',url:pageUrl,priceCurrency:'LKR',price:'80000',priceSpecification:{'@type':'PriceSpecification',minPrice:80000,priceCurrency:'LKR'},availability:'https://schema.org/InStock',seller:{'@id':SITE_URL+'/#organization'}},
  hasOfferCatalog:{'@type':'OfferCatalog',name:'Included and optional features',itemListElement:[...copy.en.included.map(([name])=>({'@type':'Offer',itemOffered:{'@type':'Service',name}})),...copy.en.shows.map(show=>({'@type':'Offer',itemOffered:{'@type':'Service',name:show.num.replace(/^\d+ — /,'')}}))]}},
 {'@type':'FAQPage','@id':pageUrl+'#faq',mainEntity:copy.en.faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
 {'@type':'BreadcrumbList','@id':pageUrl+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:'Packages',item:SITE_URL+'/packages/'},{'@type':'ListItem',position:3,name:'For teachers',item:pageUrl}]}
];
</script>

<Seo title="Teacher Website & Tuition Class Management System in Sri Lanka | Calcus AI" description="Website and AI class system for teachers and tuition classes in Sri Lanka: student, attendance and fee management, Z-score grade analyser and a subject AI in Sinhala, Tamil and English. From LKR 80,000." path="/packages/for-teachers/" image="/og-teachers.jpg" imageAlt="Calcus AI for teachers: put your class at the top — teacher website, Z-score grade analyser and subject AI in Sinhala, Tamil and English, from LKR 80,000" {jsonLd}/>

<div class="tp">

<!-- Hero -->
<section class="section tp-hero">
 <div class="tp-topbar">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">{c.crumbs[0]}</a><span aria-hidden="true">/</span><a href="/packages/">{c.crumbs[1]}</a><span aria-hidden="true">/</span><span aria-current="page">{c.crumbs[2]}</span></nav>
  <button class="tp-lang no-print" type="button" lang={c.switchTo} onclick={()=>lang.set(c.switchTo)}><Languages size={16} aria-hidden="true"/>{c.switchLabel}</button>
 </div>
 <div class="tp-hero-grid">
  <div class="tp-hero-copy">
   <h1 class="page-title"><span class="tp-eyebrow">{c.eyebrow}</span>{c.title}</h1>
   <p class="lede">{c.lede}</p>
   <div class="section-actions no-print">
    <a class="button" href="/?service=calcus-edu#contact">{c.quote} <ArrowRight size={18}/></a>
    <button class="button button-soft" type="button" onclick={exportPdf}><Download size={18}/> {c.brochure}</button>
   </div>
   {#if printHelp}<p class="tp-help no-print" role="status">{c.printHelp}</p>{/if}
  </div>

  <div class="tp-stage" aria-hidden="true">
   <div class="mock-browser">
    <div class="mb-bar"><i></i><i></i><i></i><span>kavindimaths.lk</span></div>
    <div class="site">
     <div class="site-nav"><b>Kavindi<span>.</span></b>{#each c.site.nav as item}<span>{item}</span>{/each}<em>{c.site.register}</em></div>
     <div class="site-hero">
      <div><small>{c.site.subject}</small><strong>{c.site.headline[0]}<br>{c.site.headline[1]}</strong><p>{c.site.creds}</p><div class="site-btns"><em>{c.site.view}</em><span><MessageCircle size={11}/> WhatsApp</span></div></div>
      <div class="site-portrait"><span>KJ</span></div>
     </div>
     <div class="site-classes">{#each c.site.classes as [when,name,place]}<div><small>{when}</small><b>{name}</b><span><MapPin size={10}/>{place}</span></div>{/each}</div>
    </div>
   </div>
   <div class="mock-phone">
    <div class="ph-notch"></div>
    <div class="ph-head"><small>{c.phone.label}</small><b>{c.student}</b><span>{c.course}</span></div>
    <div class="ph-grade"><div><small>{c.phone.predicted}</small><b>A</b></div><div><small>Z-score</small><b>+1.38</b></div></div>
    <svg class="ph-spark" viewBox="0 0 300 120" preserveAspectRatio="none"><polyline points={points(data.marks)}/></svg>
    <div class="ph-foot"><TrendingUp size={11}/> {c.phone.trend}</div>
   </div>
  </div>
 </div>

 <dl class="tp-facts">{#each c.facts as [label,value]}<div><dt>{label}</dt><dd>{value}</dd></div>{/each}</dl>
</section>

<!-- Showcase: grade analyser -->
<section class="section tp-show">
 <div class="tp-show-copy" use:reveal>
  <p class="tp-num">{c.shows[0].num}</p>
  <h2>{c.shows[0].title}</h2>
  <p>{c.shows[0].text}</p>
  <ul class="tp-points">{#each c.shows[0].points as point}<li>{point}</li>{/each}</ul>
  <p class="tp-note">{c.shows[0].note}</p>
 </div>
 <div class="tp-show-media" use:reveal={100} aria-hidden="true">
  <div class="mock-app solo">
   <div class="ma-main">
    <div class="ma-top"><b>{c.student}</b><span class="ma-chip">{c.course}</span></div>
    <div class="ga-grid">
     <div class="ga-chart">
      <small>{c.analyser.marks}</small>
      <svg viewBox="0 0 300 120" preserveAspectRatio="none"><g class="grid">{#each [30,60,90] as y}<line x1="0" x2="300" y1={y} y2={y}/>{/each}</g><polyline class="avg" points={points(data.classAvg)}/><polyline class="me" points={points(data.marks)}/></svg>
      <div class="ga-legend"><span class="me">{c.studentShort}</span><span class="avg">{c.analyser.avg}</span><span>{c.analyser.papers}</span></div>
     </div>
     <div class="ga-side">
      <div class="ga-card hi"><small>{c.analyser.grade}</small><b>A</b><span>{c.analyser.range}</span></div>
      <div class="ga-card"><small>Z-score</small><b>+1.38</b><span>{c.analyser.top}</span></div>
     </div>
    </div>
    <div class="ga-topics">{#each c.analyser.topics as topic,i}{@const score=data.topicScores[i]}<div class:weak={score<60}><span>{topic}</span><span class="bar"><i style="width:{score}%"></i></span><b>{score}%</b></div>{/each}</div>
   </div>
  </div>
 </div>
</section>

<!-- Showcase: subject AI -->
<section class="section tp-show flip">
 <div class="tp-show-copy" use:reveal>
  <p class="tp-num">{c.shows[1].num}</p>
  <h2>{c.shows[1].title}</h2>
  <p>{c.shows[1].text}</p>
  <ul class="tp-points">{#each c.shows[1].points as point}<li>{point}</li>{/each}</ul>
 </div>
 <div class="tp-show-media" use:reveal={100} aria-hidden="true">
  <div class="mock-chat">
   <div class="mc-head"><span class="mc-avatar"><Sparkles size={14}/></span><div><b>{c.chat.name}</b><small>{c.chat.by}</small></div><div class="mc-langs"><i class="on">සිං</i><i>EN</i><i>தமி</i></div></div>
   <div class="mc-body" lang="si">
    <p class="msg me">කොටස් වශයෙන් අනුකලනය භාවිතා කරන්නේ කවදාද?</p>
    <div class="msg ai"><p>ශ්‍රිත දෙකක ගුණිතයක් අනුකලනය කිරීමේදී එය භාවිතා කරයි. පන්තියේදී කළ ලෙස, <b>u</b> තෝරා ගැනීමට LIATE පිළිවෙළ අනුගමනය කරන්න.</p><p class="formula">∫u dv = uv − ∫v du</p><div class="mc-src"><span><FileText size={11}/> {c.chat.notes}</span><span><FileText size={11}/> 2019 A/L · Q12</span></div></div>
   </div>
   <div class="mc-input"><span>{c.chat.ask}</span><SendHorizontal size={14}/></div>
  </div>
 </div>
</section>

<!-- Showcase: notes side panel -->
<section class="section tp-show">
 <div class="tp-show-copy" use:reveal>
  <p class="tp-num">{c.shows[2].num}</p>
  <h2>{c.shows[2].title}</h2>
  <p>{c.shows[2].text}</p>
  <ul class="tp-points">{#each c.shows[2].points as point}<li>{point}</li>{/each}</ul>
 </div>
 <div class="tp-show-media" use:reveal={100} aria-hidden="true">
  <div class="mock-split">
   <div class="ms-chat">
    <p class="msg me">{c.split.q}</p>
    <div class="msg ai"><p>{c.split.a}</p></div>
    <div class="mc-input"><span>{c.split.follow}</span><SendHorizontal size={13}/></div>
   </div>
   <div class="ms-doc">
    <div class="ms-doc-bar"><FileText size={12}/><b>Integration — Part 2.pdf</b><span>{c.split.page}</span></div>
    <div class="ms-page"><b>{c.split.heading}</b><i style="width:92%"></i><i style="width:84%"></i><i style="width:88%"></i><div class="ms-hl"><small>{c.split.example}</small><p>∫x² eˣ dx = x² eˣ − 2∫x eˣ dx</p><i style="width:80%"></i><i style="width:64%"></i></div><i style="width:90%"></i><i style="width:70%"></i></div>
   </div>
  </div>
 </div>
</section>

<!-- Showcase: voice assistant -->
<section class="section tp-show flip">
 <div class="tp-show-copy" use:reveal>
  <p class="tp-num">{c.shows[3].num}</p>
  <h2>{c.shows[3].title}</h2>
  <p>{c.shows[3].text}</p>
  <ul class="tp-points">{#each c.shows[3].points as point}<li>{point}</li>{/each}</ul>
 </div>
 <div class="tp-show-media voice" use:reveal={100} aria-hidden="true">
  <div class="mock-phone call">
   <div class="ph-notch"></div>
   <div class="vc-who"><span class="mc-avatar lg"><Sparkles size={22}/></span><b>{c.voice.line}</b><small>{c.voice.who}</small></div>
   <div class="vc-wave">{#each [6,14,22,12,28,18,9,24,16,30,12,20,8,16,6] as h}<i style="height:{h}px"></i>{/each}</div>
   <p class="vc-line">{c.voice.quote}</p>
   <div class="vc-btns"><span><Mic size={15}/></span><span><Volume2 size={15}/></span><span class="end"><PhoneOff size={15}/></span></div>
  </div>
  <div class="vc-summary"><small>{c.voice.summary}</small><b>{c.voice.topic}</b><p>{c.voice.summaryText}</p><span>{c.voice.meta}</span></div>
 </div>
</section>

<!-- Showcase: payments & study analytics -->
<section class="section tp-show">
 <div class="tp-show-copy" use:reveal>
  <p class="tp-num">{c.shows[4].num}</p>
  <h2>{c.shows[4].title}</h2>
  <p>{c.shows[4].text}</p>
  <ul class="tp-points">{#each c.shows[4].points as point}<li>{point}</li>{/each}</ul>
 </div>
 <div class="tp-show-media" use:reveal={100} aria-hidden="true">
  <div class="mock-app">
   <div class="ma-side"><b>K<span>.</span></b><i></i><i class="on"></i><i></i><i></i><i></i></div>
   <div class="ma-main">
    <div class="ma-top"><b>{c.pay.title}</b><span class="ma-search"><Search size={12}/> {c.pay.search}</span><Bell size={14}/></div>
    <div class="ma-stats">{#each c.pay.stats as [label,value]}<div><small>{label}</small><b>{value}</b></div>{/each}</div>
    <div class="sa-bars">{#each c.pay.days as day,i}<div><i style="height:{data.studyWeek[i]*5}px"></i><small>{day}</small></div>{/each}</div>
    <table class="ma-table">
     <thead><tr>{#each c.pay.cols as col}<th>{col}</th>{/each}</tr></thead>
     <tbody>{#each c.pay.students as name,i}{@const study=data.study[i]}<tr><td>{name}</td><td><span class="bar"><i class:low={study<5} style="width:{study*8}%"></i></span>{study} h</td><td><span class="pill" class:due={!data.paid[i]}>{data.paid[i]?c.pay.paid:c.pay.due}</span></td></tr>{/each}</tbody>
    </table>
   </div>
  </div>
 </div>
</section>

<!-- Included -->
<section class="section" id="included">
 <div class="tp-head" use:reveal><h2>{c.includedTitle}</h2><p>{c.includedText}</p></div>
 <ol class="tp-included">{#each c.included as [title,text],i}<li use:reveal={(i%2)*60}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>{/each}</ol>
</section>

<!-- Fit -->
<section class="section">
 <div class="tp-head" use:reveal><h2>{c.fitTitle}</h2><p>{c.fitText}</p></div>
 <div class="tp-table-wrap" use:reveal>
  <table class="tp-fit">
   <thead><tr><th scope="col"><span class="sr">{c.feature}</span></th>{#each c.tiers as tier}<th scope="col">{tier}</th>{/each}</tr></thead>
   <tbody>{#each c.fit as feature,row}<tr><th scope="row">{feature}</th>{#each fitValues[row] as v}<td class={v==='—'?'none':v}>{#if v==='inc'}<Check size={16} aria-hidden="true"/>{:else if v==='—'}<Minus size={16} aria-hidden="true"/>{/if}<span>{c.fitLabel[v]}</span></td>{/each}</tr>{/each}</tbody>
  </table>
 </div>
</section>

<!-- Process -->
<section class="section">
 <div class="tp-head" use:reveal><h2>{c.stepsTitle}</h2><p>{c.stepsText}</p></div>
 <ol class="tp-steps">{#each c.steps as [title,text],i}<li use:reveal={i*70}><span>{c.step} {i+1}</span><h3>{title}</h3><p>{text}</p></li>{/each}</ol>
</section>

<!-- Extras -->
<section class="section">
 <div class="tp-head" use:reveal><h2>{c.extrasTitle}</h2><p>{c.extrasText}</p></div>
 <div class="tp-extras">{#each c.extras as [title,text],i}<div use:reveal={(i%2)*60}><h3>{title}</h3><p>{text}</p></div>{/each}</div>
</section>

<!-- FAQ -->
<section class="section tp-faq-section">
 <div class="tp-faq-grid">
  <div use:reveal><h2>{c.faqTitle}</h2><p class="tp-sub">{c.faqSub} <a href="tel:{COMPANY.phone}">{COMPANY.phoneDisplay}</a>.</p></div>
  <div class="tp-faq">{#each c.faqs as [q,a]}<details><summary>{q}<Plus size={18} aria-hidden="true"/></summary><p>{a}</p></details>{/each}</div>
 </div>
</section>

<!-- CTA -->
<section class="section">
 <div class="tp-cta" use:reveal>
  <div>
   <h2>{c.ctaTitle}</h2>
   <p>{c.ctaText}</p>
   <div class="section-actions no-print"><a class="button" href="/?service=calcus-edu#contact">{c.ctaButton} <ArrowRight size={18}/></a><button class="button button-soft" type="button" onclick={exportPdf}><Download size={18}/> {c.brochure}</button></div>
  </div>
  <div class="tp-cta-contact">
   <a href="tel:{COMPANY.phone}"><Phone size={17}/>{COMPANY.phoneDisplay}</a>
   <p><MapPin size={17}/>{COMPANY_ADDRESS}</p>
   <p class="tp-legal">{COMPANY.legalName}</p>
   <p class="print-only">calcus.ai/packages/for-teachers</p>
  </div>
 </div>
</section>

</div>

<style>
.tp{--brand:#5cb944;--mock-bg:var(--elevated);--mock-soft:var(--surface);padding-bottom:40px}
.tp h2{font-size:clamp(30px,3.6vw,46px);letter-spacing:-.035em;line-height:1.08}
.tp h3{margin:0 0 8px;font-size:19px;font-weight:600;letter-spacing:-.02em;line-height:1.3;color:var(--text)}
.tp-eyebrow{display:block;letter-spacing:0;line-height:1.45;margin:0 0 20px;font-size:14px;font-weight:500;color:var(--accent-text)}
.tp-help{font-size:14px;color:var(--text-3)}
.tp .print-only{display:none}

/* Language switch beside the breadcrumbs */
.tp-topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:26px}
.tp-topbar .breadcrumbs{margin-bottom:0}
.tp-lang{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--border-strong);border-radius:999px;background:var(--elevated);color:var(--text);font-size:14px;font-weight:500;cursor:pointer;transition:background .15s,border-color .15s}
.tp-lang:hover{background:var(--chip);border-color:var(--text-4)}
.tp-lang :global(svg){color:var(--accent-text)}
/* Sinhala needs looser line-height and no negative tracking. */
:global(:root:lang(si)) .tp :is(h2,h3,.site-hero strong,.cp-head b,.ga-card b){letter-spacing:0}
:global(:root:lang(si)) .tp h2{line-height:1.3}
:global(:root:lang(si)) .tp .site-hero strong{line-height:1.35;font-size:18px}

/* Hero */
.tp-hero{padding-top:132px}
.tp-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:56px;align-items:center}
.tp-hero .page-title{font-size:clamp(38px,4.6vw,62px)}
.tp-hero .section-actions{margin-top:30px}
.tp-stage{position:relative;padding:0 44px 40px 0}
.tp-facts{display:grid;grid-template-columns:repeat(4,1fr);margin:64px 0 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.tp-facts div{padding:22px 24px 22px 0}
.tp-facts div+div{padding-left:24px;border-left:1px solid var(--border)}
.tp-facts dt{font-size:13px;color:var(--text-3);margin-bottom:6px}
.tp-facts dd{margin:0;font-size:20px;font-weight:600;letter-spacing:-.02em;color:var(--text)}

/* Mock-ups: shared */
.mock-browser,.mock-app{border:1px solid var(--border-strong);border-radius:14px;background:var(--mock-bg);box-shadow:0 30px 60px -30px var(--shadow-pop),0 8px 24px -12px var(--shadow-pop);overflow:hidden;font-size:11px;color:var(--text)}
.mb-bar{display:flex;align-items:center;gap:6px;padding:10px 12px;border-bottom:1px solid var(--border);background:var(--mock-soft)}
.mb-bar i{width:9px;height:9px;border-radius:50%;background:var(--border-strong)}
.mb-bar span{margin-left:10px;flex:1;max-width:280px;padding:4px 10px;border-radius:6px;background:var(--mock-bg);color:var(--text-3);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.site{padding:16px 20px 20px}
.site-nav{display:flex;align-items:center;gap:14px;color:var(--text-3);font-size:10.5px}
.site-nav>span,.site-nav em{white-space:nowrap}
.site-nav b{margin-right:auto;font-size:14px;color:var(--text);letter-spacing:-.03em}
.site-nav b span,.mock-app .ma-side b span{color:var(--brand)}
.site-nav em,.site-btns em{padding:5px 10px;border-radius:6px;background:var(--btn-bg);color:var(--btn-text);font-weight:500}
.site-hero{display:grid;grid-template-columns:1fr 120px;gap:18px;align-items:center;margin:22px 0 20px}
.site-hero small,.site-classes small,.ma-stats small{display:block;color:var(--text-3);font-size:10px}
.site-hero strong{display:block;margin:6px 0 8px;font-size:21px;line-height:1.15;letter-spacing:-.035em}
.site-hero p{margin:0 0 12px;color:var(--text-3);font-size:10.5px;line-height:1.4}
.site-btns{display:flex;gap:8px;align-items:center}
.site-btns span{display:inline-flex;gap:4px;align-items:center;padding:4px 9px;border-radius:6px;border:1px solid var(--border-strong)}
.site-portrait{aspect-ratio:4/5;border-radius:12px;display:grid;place-items:end start;padding:10px;background:linear-gradient(160deg,var(--green-widget),var(--blue-soft));color:var(--green-widget-text);font-size:22px;font-weight:700;letter-spacing:-.04em}
.site-classes{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.site-classes div{padding:10px;border-radius:9px;background:var(--mock-soft);border:1px solid var(--border)}
.site-classes b{display:block;margin:3px 0 4px;font-size:11px}
.site-classes span{display:flex;gap:3px;align-items:center;color:var(--text-3);font-size:10px}

.mock-phone{position:absolute;right:0;bottom:0;width:178px;padding:12px 12px 14px;border-radius:26px;border:5px solid #1c1c1c;outline:1px solid var(--border-strong);background:var(--mock-bg);box-shadow:0 30px 50px -20px var(--shadow-pop);font-size:11px;color:var(--text)}
.ph-notch{width:46px;height:5px;margin:0 auto 12px;border-radius:5px;background:var(--border-strong)}
.ph-head small{display:block;color:var(--text-3);font-size:9.5px}
.ph-head b{display:block;margin:2px 0 1px;font-size:13px;letter-spacing:-.02em}
.ph-head span{font-size:10px;color:var(--accent-text)}
.ph-foot{padding:7px;border-radius:8px;background:var(--mock-soft);text-align:center;font-size:10px;color:var(--text-3)}

/* Showcase rows */
.tp-show{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:64px;align-items:center}
.tp-show.flip{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
.tp-show.flip .tp-show-copy{order:2}
.tp-num{margin:0 0 14px;font-size:14px;font-weight:500;color:var(--text-3)}
.tp-show-copy>p:not(.tp-num){margin:18px 0 0;font-size:17px;color:var(--text-3)}
.tp-points{list-style:none;margin:24px 0 0;padding:0;border-top:1px solid var(--border)}
.tp-points li{padding:12px 0 12px 22px;position:relative;border-bottom:1px solid var(--border);font-size:15.5px;color:var(--text-2)}
.tp-points li::before{content:"";position:absolute;left:2px;top:50%;width:8px;height:8px;margin-top:-4px;border-radius:2px;background:var(--brand)}
.tp-show-media{padding:36px;border-radius:24px;background:var(--surface)}


.mock-app{display:grid;grid-template-columns:44px 1fr}
.ma-side{display:flex;flex-direction:column;align-items:center;gap:12px;padding:14px 0;border-right:1px solid var(--border);background:var(--mock-soft)}
.ma-side b{font-size:15px;margin-bottom:6px}
.ma-side i{width:16px;height:16px;border-radius:5px;background:var(--border-strong)}
.ma-side i.on{background:var(--brand)}
.ma-main{padding:14px 16px 16px;min-width:0}
.ma-top{display:flex;align-items:center;gap:12px;color:var(--text-3)}
.ma-top b{font-size:14px;color:var(--text);margin-right:auto}
.ma-search{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:6px;background:var(--mock-soft);border:1px solid var(--border);font-size:10.5px}
.ma-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}
.ma-stats div{padding:9px 10px;border-radius:9px;border:1px solid var(--border)}
.ma-stats b{display:block;margin-top:2px;font-size:17px;letter-spacing:-.03em}
.ma-table{width:100%;border-collapse:collapse;font-size:11px}
.ma-table th{text-align:left;font-weight:500;color:var(--text-3);font-size:10px;padding:0 6px 7px 0;border-bottom:1px solid var(--border)}
.ma-table td{padding:8px 6px 8px 0;border-bottom:1px solid var(--border);white-space:nowrap}
.ma-table td:nth-child(2){color:var(--text-3)}
.bar{display:inline-block;width:42px;height:4px;margin-right:6px;vertical-align:middle;border-radius:4px;background:var(--chip);overflow:hidden}
.bar i{display:block;height:100%;background:var(--brand)}
.pill{padding:2px 7px;border-radius:99px;font-size:10px;background:var(--green-soft);color:var(--green-soft-text)}
.pill.due{background:rgba(242,154,4,.14);color:var(--orange-deep)}


/* Hero phone: grade card */
.ph-grade{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0 8px}
.ph-grade div{padding:8px;border-radius:9px;background:var(--mock-soft);border:1px solid var(--border)}
.ph-grade small{display:block;color:var(--text-3);font-size:9px}
.ph-grade b{font-size:20px;letter-spacing:-.03em}
.ph-grade div:first-child b{color:var(--accent-text)}
.ph-spark{display:block;width:100%;height:46px;margin-bottom:8px}
.ph-spark polyline,.ga-chart polyline.me{fill:none;stroke:var(--brand);stroke-width:2.5;vector-effect:non-scaling-stroke;stroke-linejoin:round}
.ph-foot{display:flex;align-items:center;justify-content:center;gap:4px}
.ph-foot :global(svg){color:var(--accent-text)}
.tp-note{margin:16px 0 0!important;font-size:13.5px!important;color:var(--text-4)!important}

/* Grade analyser */
.mock-app.solo{display:block}
.ma-chip{padding:3px 9px;border-radius:99px;background:var(--chip);font-size:10.5px}
.ga-grid{display:grid;grid-template-columns:1fr 140px;gap:10px;margin:14px 0 12px}
.ga-chart{padding:10px 12px;border-radius:10px;border:1px solid var(--border)}
.ga-chart small,.ga-card small,.vc-summary small{display:block;color:var(--text-3);font-size:10px}
.ga-chart svg{display:block;width:100%;height:120px;margin:8px 0 6px;overflow:visible}
.ga-chart .grid line{stroke:var(--border);stroke-width:1;vector-effect:non-scaling-stroke}
.ga-chart polyline.avg{fill:none;stroke:var(--text-4);stroke-width:1.5;stroke-dasharray:4 4;vector-effect:non-scaling-stroke}
.ga-legend{display:flex;gap:14px;font-size:10px;color:var(--text-3)}
.ga-legend span:last-child{margin-left:auto}
.ga-legend .me::before,.ga-legend .avg::before{content:"";display:inline-block;width:12px;height:2px;margin-right:5px;vertical-align:middle;background:var(--brand)}
.ga-legend .avg::before{background:var(--text-4)}
.ga-side{display:grid;gap:10px}
.ga-card{padding:10px 12px;border-radius:10px;border:1px solid var(--border)}
.ga-card b{display:block;margin:2px 0;font-size:26px;letter-spacing:-.04em}
.ga-card span{font-size:10px;color:var(--text-3)}
.ga-card.hi{background:var(--green-soft);border-color:transparent}
.ga-card.hi b{color:var(--green-soft-text)}
.ga-topics{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px}
.ga-topics div{display:flex;align-items:center;gap:8px;font-size:11px}
.ga-topics span:first-child{flex:1}
.ga-topics .bar{width:70px}
.ga-topics b{width:30px;text-align:right;font-weight:600}
.ga-topics .weak b{color:var(--orange-deep)}
.ga-topics .weak .bar i{background:var(--orange)}

/* Chat */
.mock-chat,.mock-split{border:1px solid var(--border-strong);border-radius:14px;background:var(--mock-bg);box-shadow:0 30px 60px -30px var(--shadow-pop),0 8px 24px -12px var(--shadow-pop);overflow:hidden;font-size:12px;color:var(--text)}
.mock-chat{max-width:470px;margin:0 auto}
.mc-head{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--border)}
.mc-head b{display:block;font-size:13px}
.mc-head small{color:var(--text-3);font-size:10.5px}
.mc-avatar{display:grid;place-items:center;flex-shrink:0;width:30px;height:30px;border-radius:50%;background:var(--green-soft);color:var(--green-soft-text)}
.mc-avatar.lg{width:64px;height:64px;margin:0 auto 10px}
.mc-langs{display:flex;gap:3px;margin-left:auto;padding:3px;border-radius:8px;background:var(--chip)}
.mc-langs i{font-style:normal;padding:3px 7px;border-radius:6px;font-size:10.5px;color:var(--text-3)}
.mc-langs i.on{background:var(--mock-bg);color:var(--text);box-shadow:0 1px 2px var(--shadow-pop)}
.mc-body{display:flex;flex-direction:column;gap:10px;padding:16px 14px}
.msg{margin:0;max-width:86%;padding:9px 12px;border-radius:12px;line-height:1.55}
.msg p{margin:0}
.msg.me{align-self:flex-end;background:var(--btn-bg);color:var(--btn-text);border-bottom-right-radius:4px}
.msg.ai{align-self:flex-start;background:var(--mock-soft);border:1px solid var(--border);border-bottom-left-radius:4px}
.formula{margin:8px 0 0!important;padding:6px 10px;border-radius:7px;background:var(--mock-bg);font-family:ui-monospace,Menlo,monospace;font-size:11.5px}
.mc-src{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
.mc-src span{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:99px;background:var(--blue-soft);color:var(--blue-soft-text);font-size:10px}
.mc-input{display:flex;align-items:center;gap:8px;margin:0 12px 12px;padding:9px 12px;border-radius:10px;border:1px solid var(--border);color:var(--text-4);font-size:11px}
.mc-input span{flex:1}

/* Split: chat + notes */
.mock-split{display:grid;grid-template-columns:.9fr 1.1fr;font-size:11.5px}
.ms-chat{display:flex;flex-direction:column;gap:10px;padding:14px 0 0 12px}
.ms-chat .msg{max-width:92%;margin-right:12px}
.ms-chat .mc-input{margin:auto 12px 12px 0}
.ms-doc{border-left:1px solid var(--border);background:var(--mock-soft)}
.ms-doc-bar{display:flex;align-items:center;gap:6px;padding:10px 12px;border-bottom:1px solid var(--border);font-size:10.5px}
.ms-doc-bar b{flex:1;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ms-doc-bar span{color:var(--text-3)}
.ms-page{margin:12px;padding:14px;border-radius:6px;background:var(--mock-bg);box-shadow:0 2px 8px -4px var(--shadow-pop)}
.ms-page>b{display:block;margin-bottom:8px;font-size:12px}
.ms-page i,.ms-hl i{display:block;height:5px;margin:7px 0;border-radius:3px;background:var(--chip)}
.ms-hl{margin:10px -6px;padding:8px 10px;border-radius:6px;background:rgba(242,154,4,.13);border-left:3px solid var(--orange)}
.ms-hl small{display:block;font-size:10px;color:var(--orange-deep);font-weight:500}
.ms-hl p{margin:5px 0 0;font-family:ui-monospace,Menlo,monospace;font-size:11px}

/* Voice */
.tp-show-media.voice{display:flex;align-items:center;justify-content:center;gap:22px}
.mock-phone.call{position:relative;right:auto;bottom:auto;flex-shrink:0;width:210px;padding:14px 16px 18px;text-align:center}
.vc-who{margin-top:14px}
.vc-who b{display:block;font-size:14px}
.vc-who small{color:var(--text-3);font-size:10.5px}
.vc-wave{display:flex;align-items:center;justify-content:center;gap:3px;height:40px;margin:16px 0 12px}
.vc-wave i{width:4px;border-radius:2px;background:var(--brand)}
.vc-line{margin:0 0 16px;font-size:10.5px;line-height:1.5;color:var(--text-2)}
.vc-btns{display:flex;justify-content:center;gap:14px}
.vc-btns span{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--chip);color:var(--text)}
.vc-btns .end{background:#e5484d;color:#fff}
.vc-summary{max-width:200px;padding:14px;border-radius:14px;border:1px solid var(--border-strong);background:var(--mock-bg);font-size:11px;color:var(--text);box-shadow:0 20px 40px -24px var(--shadow-pop)}
.vc-summary b{display:block;margin:4px 0 6px;font-size:12.5px}
.vc-summary p{margin:0 0 10px;line-height:1.5;color:var(--text-3)}
.vc-summary span{font-size:10px;color:var(--accent-text)}

/* Study analytics */
.sa-bars{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;height:90px;margin-bottom:12px;padding:10px 12px 8px;border-radius:10px;border:1px solid var(--border)}
.sa-bars div{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px}
.sa-bars i{display:block;width:100%;max-width:26px;border-radius:4px 4px 0 0;background:var(--brand);opacity:.85}
.sa-bars small{font-size:9.5px;color:var(--text-3)}
.bar i.low{background:var(--orange)}

/* Section heads */
.tp-head{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end;margin-bottom:36px}
.tp-head p{margin:0;font-size:16px;color:var(--text-3);max-width:440px;justify-self:end}

/* Included */
.tp-included{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;column-gap:56px;border-top:1px solid var(--border)}
.tp-included li{display:flex;gap:22px;padding:26px 0;border-bottom:1px solid var(--border)}
.tp-included li>span{flex-shrink:0;width:28px;padding-top:2px;font-size:14px;font-variant-numeric:tabular-nums;color:var(--accent-text);font-weight:600}
.tp-included p,.tp-extras p,.tp-steps p{margin:0;font-size:15.5px;line-height:1.6;color:var(--text-3)}

/* Fit table */
.tp-table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:18px}
.tp-fit{width:100%;min-width:620px;border-collapse:collapse;font-size:15px}
.tp-fit th,.tp-fit td{padding:16px 20px;text-align:left;border-bottom:1px solid var(--border)}
.tp-fit tbody tr:last-child>*{border-bottom:0}
.tp-fit thead th{background:var(--surface);font-size:14px;font-weight:600;color:var(--text)}
.tp-fit tbody th{font-weight:400;color:var(--text-2)}
.tp-fit td{color:var(--text-3);white-space:nowrap}
.tp-fit td :global(svg){vertical-align:-3px;margin-right:6px}
.tp-fit td.inc{color:var(--text)}.tp-fit td.inc :global(svg){color:var(--accent-text)}
.tp-fit td.rec span{padding:3px 9px;border-radius:99px;background:var(--blue-soft);color:var(--blue-soft-text);font-size:13px}
.tp-fit td.none{color:var(--text-4)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

/* Steps */
.tp-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.tp-steps li{padding:26px 0 0;border-top:2px solid var(--border)}
.tp-steps li:first-child{border-color:var(--brand)}
.tp-steps span{display:block;margin-bottom:16px;font-size:13px;font-weight:500;color:var(--text-3)}

/* Extras */
.tp-extras{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:18px;overflow:hidden}
.tp-extras div{padding:26px;background:var(--bg)}

/* FAQ */
.tp-faq-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:64px}
.tp-sub{margin:16px 0 0;font-size:16px;color:var(--text-3)}
.tp-sub a{color:var(--blue-text)}
.tp-faq{border-top:1px solid var(--border)}
.tp-faq details{border-bottom:1px solid var(--border)}
.tp-faq summary{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:20px 0;font-size:17px;font-weight:500;color:var(--text);cursor:pointer;list-style:none}
.tp-faq summary::-webkit-details-marker{display:none}
.tp-faq summary :global(svg){flex-shrink:0;color:var(--text-3);transition:transform .2s}
.tp-faq details[open] summary :global(svg){transform:rotate(45deg)}
.tp-faq details p{margin:-4px 0 22px;max-width:620px;font-size:15.5px;color:var(--text-3)}

/* CTA */
.tp-cta{display:grid;grid-template-columns:1.4fr 1fr;gap:56px;align-items:end;padding:52px;border-radius:26px;background:var(--green-soft)}
.tp-cta>div>p{margin:16px 0 26px;max-width:540px;font-size:17px;color:var(--text-2)}
.tp-cta-contact{display:flex;flex-direction:column;gap:12px;padding-left:40px;border-left:1px solid var(--line)}
.tp-cta-contact a,.tp-cta-contact p{display:flex;gap:10px;align-items:flex-start;margin:0;font-size:15px;line-height:1.5;color:var(--text-2)}
.tp-cta-contact a{font-size:20px;font-weight:600;color:var(--text)}
.tp-cta-contact :global(svg){flex-shrink:0;margin-top:3px;color:var(--green-soft-text)}
.tp-legal{color:var(--text-3)!important;font-size:13.5px!important}

@media(max-width:960px){
 .tp-hero-grid,.tp-show,.tp-faq-grid,.tp-cta{grid-template-columns:1fr;gap:40px}
 .tp-show.flip{grid-template-columns:1fr}.tp-show.flip .tp-show-copy{order:0}
 .tp-steps{grid-template-columns:1fr 1fr;row-gap:32px}
 .tp-extras{grid-template-columns:1fr 1fr}
 .tp-cta-contact{padding-left:0;border-left:0}
}
@media(max-width:640px){
 .tp-hero{padding-top:104px}
 .tp-stage{padding:0 0 70px}
 .mock-phone{width:150px;right:-6px}
 .site-hero{grid-template-columns:1fr 80px}
 .site-nav>span:nth-of-type(3){display:none}
 .site-classes{grid-template-columns:1fr 1fr}.site-classes div:nth-child(3){display:none}
 .tp-facts{grid-template-columns:1fr 1fr}
 .tp-facts div:nth-child(3){padding-left:0;border-left:0}
 .tp-facts div:nth-child(n+3){border-top:1px solid var(--border)}
 .tp-facts dd{font-size:17px}
 .tp-show-media{padding:16px;margin-inline:-2%}
 .ma-stats{grid-template-columns:1fr 1fr}
 .ma-table th:nth-child(2),.ma-table td:nth-child(2){display:none}
 .ga-grid{grid-template-columns:1fr}.ga-side{grid-template-columns:1fr 1fr}.ga-topics{grid-template-columns:1fr}
 .mock-split{grid-template-columns:1fr}.ms-doc{border-left:0;border-top:1px solid var(--border)}
 .tp-show-media.voice{flex-direction:column}.vc-summary{max-width:none;width:100%}
 .tp-head{grid-template-columns:1fr;gap:14px}.tp-head p{justify-self:start}
 .tp-included,.tp-steps,.tp-extras{grid-template-columns:1fr}
 .tp-cta{padding:30px 22px}
}

@media print{
 @page{size:A4;margin:14mm}
 :global(body:has(.tp)){background:#fff!important;color:#111!important}
 :global(body:has(.tp) header),:global(body:has(.tp) footer),:global(body:has(.tp) .call-fab),:global(body:has(.tp) .skip-link){display:none!important}
 .no-print{display:none!important}.tp .print-only{display:flex}
 .tp{--bg:#fff;--elevated:#fff;--surface:#f6f6f4;--chip:#f1f1ef;--text:#111;--text-2:#333;--text-3:#555;--text-4:#777;--border:#e2e2df;--border-strong:#d0d0cc;--line:#d9e3d2;--green-soft:#f1f7ed;--green-soft-text:#3c7a26;--accent-text:#398600;--blue-text:#0068a8;--blue-soft:#e6f3fb;--blue-soft-text:#0068a8;--btn-bg:#111;--btn-text:#fff;--shadow-pop:transparent;padding:0}
 .tp :global(.reveal){opacity:1!important;transform:none!important}
 .tp .section{padding:20px 0 0;max-width:none}
 .tp-hero{padding-top:0!important}
 .tp h2{font-size:24px}.tp h3{font-size:15px}
 .tp p,.tp li,.tp td,.tp th{font-size:12px!important;line-height:1.5}
 .tp-hero .page-title{font-size:32px}
 .tp-hero-grid,.tp-show{grid-template-columns:1fr 1fr;gap:24px}
 .tp-facts{margin-top:20px}.tp-facts div{padding:12px 14px 12px 0}.tp-facts dd{font-size:15px}
 .tp-show,.tp-included li,.tp-steps li,.tp-extras div,.tp-faq details,.tp-cta,.tp-table-wrap{break-inside:avoid}
 .tp-show-media{padding:14px}
 .tp-faq details{display:block}.tp-faq details p{display:block}
 .tp-cta{padding:22px;gap:24px}
}
</style>
