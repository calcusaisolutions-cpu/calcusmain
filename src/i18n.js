// Site copy in English and Sinhala. The Sinhala is deliberately casual and friendly, keeping the
// English tech words people in Sri Lanka actually use (AI, website, app, startup…).
import { writable, derived } from 'svelte/store';

const messages = {
 en: {
  'meta.title': 'CalcusAi — AI solutions across Sri Lanka',
  'nav.aria': 'Main navigation', 'nav.home': 'Home', 'nav.services': 'Services', 'nav.approach': 'Our approach', 'nav.contact': 'Contact', 'nav.cta': 'Let’s talk',
  'mega.aria': 'Services', 'mega.groupAi': 'AI & automation', 'mega.groupBuild': 'Design & build',
  'mega.aiText': 'Assistants and intelligent tools shaped around your work',
  'mega.autoText': 'Connect your tools and simplify everyday workflows',
  'mega.webText': 'Expressive sites, purposeful motion and 3D experiences',
  'mega.softText': 'Customer-facing apps and internal tools, built around you',
  'mega.how': 'How we work', 'mega.kicker': 'OUR APPROACH', 'mega.title': 'Start small, see it work',
  'mega.text': 'Try a focused prototype, see what works, and shape the solution together.', 'mega.link': 'How we think',
  'mega.all': 'View all services', 'mega.talk': 'Talk to us',
  'svc.ai': 'AI solutions', 'svc.auto': 'Business automation', 'svc.web': 'Interactive websites & 3D', 'svc.soft': 'Custom software',
  'opt.ai': 'AI solutions', 'opt.auto': 'Business automation', 'opt.web': 'Interactive website', 'opt.3d': '3D experience', 'opt.motion': 'Motion design', 'opt.product': 'Digital product',
  'hero.mapAlt': 'Sri Lanka connected by a network of nodes', 'hero.mascotAlt': 'CalcusAi’s friendly green astronaut mascot',
  'hero.intro': 'Bringing AI solutions to wherever they’re needed across Sri Lanka 🇱🇰',
  'hero.explore': 'Let’s explore your idea', 'hero.dunno': 'I don’t know how?',
  'ask.prompt': 'Tell me what you do: your business, your job, or the startup you’re dreaming up.',
  'ask.reply': 'Love it! Let’s find where AI can help. I’ve added that to the form below.',
  'ask.placeholder': 'e.g. I run a small bakery in Kandy', 'ask.label': 'What do you do?', 'ask.send': 'Send', 'ask.close': 'Close',
  'spot.sales': 'Sales this week', 'spot.summarise': 'Summarise this week’s sales', 'spot.draft': 'Draft reply', 'spot.ready': 'Ready',
  'spot.reply': 'Help me reply to this customer', 'spot.headline': 'Intelligent help for every business', 'spot.title': 'AI solutions for everyone in Sri Lanka',
  'spot.1.title': 'Assistants that know your business', 'spot.1.tag': 'AI solutions', 'spot.1.note': 'Chat, voice and knowledge',
  'spot.2.title': 'Workflows that run themselves', 'spot.2.tag': 'Automation', 'spot.2.note': 'Less busywork',
  'spot.3.title': 'Websites people remember', 'spot.3.tag': 'Web & 3D', 'spot.3.note': 'Motion and 3D experiences',
  'spot.4.title': 'Software built around you', 'spot.4.tag': 'Custom software', 'spot.4.note': 'Apps and internal tools',
  'spot.5.title': 'From Colombo, for all of Sri Lanka', 'spot.5.tag': 'Company', 'spot.5.note': 'Our approach',
  'services.kicker': 'What we do', 'services.title': 'A smarter way to move forward.',
  'services.lede': 'Your goals come first. Together, we find where AI, automation, and thoughtful software can make a difference.',
  'f1.title': 'Assistants shaped around the way you work.', 'f1.bar': 'Business assistant', 'f1.online': 'Online',
  'f1.user': 'Which orders still need a follow-up this week?', 'f1.bot': 'Three orders are waiting on a reply. Want me to draft the follow-up messages?', 'f1.ask': 'Ask anything…',
  'f2.title': 'Less busywork. More time for what matters.', 'f2.bar': 'New enquiry workflow', 'f2.running': 'Running',
  'f2.s1': 'New enquiry arrives', 'f2.s1n': 'Website form', 'f2.s2': 'Sort, tag and summarise', 'f2.s2n': 'Handled automatically',
  'f2.s3': 'Team notified', 'f2.s3n': 'Assigned to the right person', 'f2.done': 'Done',
  'f3.title': 'Websites people remember.',
  'f4.title': 'Your idea, turned into practical software.', 'f4.bar': 'Operations', 'f4.live': 'Live', 'f4.orders': 'Orders today', 'f4.tasks': 'Open tasks', 'f4.ontime': 'On time',
  'ideas.title': 'Ideas we can explore together',
  'idea.1': 'Answer customer questions around the clock', 'idea.2': 'Automate weekly reporting', 'idea.3': 'Launch a 3D product showcase', 'idea.4': 'Replace spreadsheets with an app',
  'approach.kicker': 'How we think', 'approach.title': 'Big possibilities. A human approach.',
  'approach.lede': 'Technology feels better when it makes sense. We start with your real needs and build something you can use with confidence.',
  'p1.title': 'Start with you', 'p1.text': 'Tell us about your business, the tasks that slow you down, and the ideas you want to explore.',
  'p2.title': 'Explore the possibilities', 'p2.text': 'Try a focused prototype, see what works, and shape the solution together.',
  'p3.title': 'Make it work for people', 'p3.text': 'Responsive layouts, reduced-motion support, and adaptive graphics keep the experience welcoming.',
  'contact.kicker': 'Your idea starts here', 'contact.title': 'Have something in mind?', 'contact.label': 'Start a conversation',
  'contact.heading': 'Tell us about your idea.', 'contact.text': 'An AI idea, a workflow to simplify, or a website to bring to life? We’d love to hear what you have in mind.',
  'contact.location': 'Colombo, Sri Lanka',
  'form.name': 'Your name', 'form.namePh': 'What should we call you?', 'form.email': 'Email address', 'form.service': 'What are we creating?',
  'form.message': 'A little about your idea', 'form.messagePh': 'The idea, the ambition, the possibilities…',
  'form.send': 'Send your project brief', 'form.sending': 'Sending…',
  'form.saved': 'Your brief is saved. Thank you for reaching out.', 'form.failed': 'We couldn’t save your brief. Please try again when the server is available.',
  'footer.blurb': 'AI solutions, automation and software — from Colombo, for all of Sri Lanka.',
  'footer.services': 'Services', 'footer.company': 'Company', 'footer.location': 'Location', 'footer.tagline': 'AI solutions. Human possibilities.',
  'theme.aria': 'Theme', 'theme.system': 'System', 'theme.light': 'Light', 'theme.dark': 'Dark', 'lang.aria': 'Language'
 },
 si: {
  'meta.title': 'CalcusAi — ලංකාව පුරා AI විසඳුම්',
  'nav.aria': 'ප්‍රධාන මෙනුව', 'nav.home': 'මුල් පිටුව', 'nav.services': 'සේවා', 'nav.approach': 'අපේ ක්‍රමය', 'nav.contact': 'සම්බන්ධ වෙන්න', 'nav.cta': 'කතා කරමු',
  'mega.aria': 'සේවා', 'mega.groupAi': 'AI සහ automation', 'mega.groupBuild': 'Design කරලා හදමු',
  'mega.aiText': 'ඔයාගේ වැඩේට ගැලපෙන්න හදපු AI assistants සහ smart tools',
  'mega.autoText': 'ඔයාගේ tools එකට connect කරලා, දවසේ වැඩ ලේසි කරමු',
  'mega.webText': 'ලස්සන sites, තේරුමක් තියෙන animations සහ 3D අත්දැකීම්',
  'mega.softText': 'Customersලට apps, ඇතුළේ පාවිච්චියට tools — ඔයාට ගැලපෙන්න හදලා',
  'mega.how': 'අපි වැඩ කරන විදිහ', 'mega.kicker': 'අපේ ක්‍රමය', 'mega.title': 'පොඩියට පටන් ගමු, වැඩ කරනවද බලමු',
  'mega.text': 'පොඩි prototype එකක් හදලා, මොකක්ද හරියන්නේ කියලා බලලා, එකට හදමු.', 'mega.link': 'අපි හිතන විදිහ',
  'mega.all': 'ඔක්කොම සේවා බලන්න', 'mega.talk': 'අපිත් එක්ක කතා කරන්න',
  'svc.ai': 'AI විසඳුම්', 'svc.auto': 'Business automation', 'svc.web': 'Interactive websites සහ 3D', 'svc.soft': 'Custom software',
  'opt.ai': 'AI විසඳුම්', 'opt.auto': 'Business automation', 'opt.web': 'Interactive website එකක්', 'opt.3d': '3D අත්දැකීමක්', 'opt.motion': 'Motion design', 'opt.product': 'Digital product එකක්',
  'hero.mapAlt': 'Nodes ජාලයකින් එකට සම්බන්ධ කරපු ශ්‍රී ලංකාව', 'hero.mascotAlt': 'CalcusAi ගේ යාළු කොළ පාට astronaut mascot',
  'hero.intro': 'ලංකාවේ ඕන තැනකට AI විසඳුම් ගෙනියමු 🇱🇰',
  'hero.explore': 'ඔයාගේ idea එක බලමු', 'hero.dunno': 'කොහොමද කියලා දන්නේ නෑ?',
  'ask.prompt': 'මට කියන්න ඔයා මොකද කරන්නේ කියලා — business එකක්ද, job එකක්ද, නැත්නම් හිතේ තියෙන startup එකක්ද?',
  'ask.reply': 'නියමයි! AI වලින් උදව් කරන්න පුළුවන් තැන් හොයමු. මම ඒක පහළ form එකට දැම්මා.',
  'ask.placeholder': 'උදා: මම මහනුවර පොඩි bakery එකක් කරනවා', 'ask.label': 'ඔයා මොකද කරන්නේ?', 'ask.send': 'යවන්න', 'ask.close': 'වහන්න',
  'spot.sales': 'මේ සතියේ sales', 'spot.summarise': 'මේ සතියේ sales ටික කෙටියෙන් කියන්න', 'spot.draft': 'Reply එකේ draft එක', 'spot.ready': 'ලෑස්තියි',
  'spot.reply': 'මේ customer ට reply කරන්න උදව් කරන්න', 'spot.headline': 'හැම business එකකටම smart උදව්වක්', 'spot.title': 'ලංකාවේ හැමෝටම AI විසඳුම්',
  'spot.1.title': 'ඔයාගේ business එක දන්න assistants', 'spot.1.tag': 'AI විසඳුම්', 'spot.1.note': 'Chat, voice සහ දැනුම',
  'spot.2.title': 'තනියම දුවන workflows', 'spot.2.tag': 'Automation', 'spot.2.note': 'අනවශ්‍ය වැඩ අඩුයි',
  'spot.3.title': 'මතක හිටින websites', 'spot.3.tag': 'Web සහ 3D', 'spot.3.note': 'Motion සහ 3D අත්දැකීම්',
  'spot.4.title': 'ඔයාට ගැලපෙන්න හදපු software', 'spot.4.tag': 'Custom software', 'spot.4.note': 'Apps සහ ඇතුළේ tools',
  'spot.5.title': 'කොළඹ ඉඳන්, මුළු ලංකාවටම', 'spot.5.tag': 'අපි ගැන', 'spot.5.note': 'අපේ ක්‍රමය',
  'services.kicker': 'අපි කරන දේ', 'services.title': 'ඉස්සරහට යන්න smart විදිහක්.',
  'services.lede': 'ඔයාගේ ඉලක්ක තමයි මුලින්ම. AI, automation සහ හොඳට හිතලා හදපු software වලින් වෙනසක් කරන්න පුළුවන් තැන් අපි එකට හොයමු.',
  'f1.title': 'ඔයා වැඩ කරන විදිහටම හැදෙන assistants.', 'f1.bar': 'Business assistant', 'f1.online': 'Online',
  'f1.user': 'මේ සතියේ තාම follow-up කරන්න ඕන orders මොනවද?', 'f1.bot': 'Orders තුනක් reply එකක් එනකම් ඉන්නවා. Follow-up messages ටික මම draft කරන්නද?', 'f1.ask': 'ඕනම දෙයක් අහන්න…',
  'f2.title': 'අනවශ්‍ය වැඩ අඩුයි. වැදගත් දේවල් වලට වැඩි වෙලාවක්.', 'f2.bar': 'අලුත් enquiry workflow', 'f2.running': 'දුවනවා',
  'f2.s1': 'අලුත් enquiry එකක් එනවා', 'f2.s1n': 'Website form', 'f2.s2': 'Sort කරලා, tag කරලා, කෙටියෙන් කියනවා', 'f2.s2n': 'Automatically වෙනවා',
  'f2.s3': 'Team එකට දැනුම් දෙනවා', 'f2.s3n': 'හරි කෙනාට assign වෙනවා', 'f2.done': 'ඉවරයි',
  'f3.title': 'මිනිස්සුන්ට මතක හිටින websites.',
  'f4.title': 'ඔයාගේ idea එක, වැඩට ගන්න පුළුවන් software එකක් විදිහට.', 'f4.bar': 'Operations', 'f4.live': 'Live', 'f4.orders': 'අද orders', 'f4.tasks': 'ඉතුරු වැඩ', 'f4.ontime': 'වෙලාවට',
  'ideas.title': 'අපිට එකට try කරන්න පුළුවන් ideas',
  'idea.1': 'පැය 24ම customer ප්‍රශ්න වලට උත්තර දෙමු', 'idea.2': 'සතියේ reports automatic කරමු', 'idea.3': '3D product showcase එකක් දාමු', 'idea.4': 'Spreadsheets වෙනුවට app එකක් හදමු',
  'approach.kicker': 'අපි හිතන විදිහ', 'approach.title': 'ලොකු හීන. මිනිස්සුන්ට ගැලපෙන විදිහට.',
  'approach.lede': 'Technology හොඳ තේරෙනකොට තමයි. අපි ඔයාගේ ඇත්ත අවශ්‍යතා වලින් පටන් අරන්, බය නැතුව පාවිච්චි කරන්න පුළුවන් දෙයක් හදනවා.',
  'p1.title': 'ඔයාගෙන් පටන් ගමු', 'p1.text': 'ඔයාගේ business එක ගැන, වැඩ හිර කරන දේවල් ගැන, try කරන්න ආස ideas ගැන අපිට කියන්න.',
  'p2.title': 'පුළුවන් දේවල් හොයලා බලමු', 'p2.text': 'පොඩි prototype එකක් try කරලා, මොකක්ද වැඩ කරන්නේ කියලා බලලා, එකට හදමු.',
  'p3.title': 'මිනිස්සුන්ට ලේසි වෙන්න හදමු', 'p3.text': 'ඕනම screen එකකට ගැලපෙන layouts, අඩු motion support සහ ගැලපෙන graphics නිසා හැමෝටම ලේසියි.',
  'contact.kicker': 'ඔයාගේ idea එක මෙතනින් පටන් ගන්නවා', 'contact.title': 'හිතේ මොනවා හරි තියෙනවද?', 'contact.label': 'කතාවක් පටන් ගමු',
  'contact.heading': 'ඔයාගේ idea එක ගැන කියන්න.', 'contact.text': 'AI idea එකක්ද, ලේසි කරන්න ඕන workflow එකක්ද, නැත්නම් හදන්න ඕන website එකක්ද? ඔයාගේ හිතේ තියෙන දේ අහන්න අපි හරිම ආසයි.',
  'contact.location': 'කොළඹ, ශ්‍රී ලංකාව',
  'form.name': 'ඔයාගේ නම', 'form.namePh': 'අපි ඔයාට මොකක්ද කියන්නේ?', 'form.email': 'Email address එක', 'form.service': 'අපි මොනවද හදන්නේ?',
  'form.message': 'ඔයාගේ idea එක ගැන පොඩ්ඩක්', 'form.messagePh': 'Idea එක, හීනය, කරන්න පුළුවන් දේවල්…',
  'form.send': 'Project brief එක යවන්න', 'form.sending': 'යවනවා…',
  'form.saved': 'ඔයාගේ brief එක save වුණා. අපිට ලිව්වට ගොඩක් ස්තූතියි!', 'form.failed': 'අපිට brief එක save කරගන්න බැරි වුණා. Server එක තියෙනකොට ආයෙත් try කරන්න.',
  'footer.blurb': 'AI විසඳුම්, automation සහ software — කොළඹ ඉඳන්, මුළු ලංකාවටම.',
  'footer.services': 'සේවා', 'footer.company': 'අපි ගැන', 'footer.location': 'අපි ඉන්න තැන', 'footer.tagline': 'AI විසඳුම්. මිනිස්සුන්ට ගැලපෙන විදිහට.',
  'theme.aria': 'තේමාව', 'theme.system': 'System', 'theme.light': 'එළිය', 'theme.dark': 'අඳුර', 'lang.aria': 'භාෂාව'
 }
};

function initial(){
 try{const saved=localStorage.getItem('lang');if(saved==='si'||saved==='en')return saved;}catch{}
 return 'en';
}

export const lang = writable(initial());
export const t = derived(lang, $lang => key => messages[$lang][key] ?? messages.en[key] ?? key);

let fontLoaded=false;
lang.subscribe(value=>{
 if(typeof document==='undefined')return;
 document.documentElement.lang=value;
 try{if(value==='en')localStorage.removeItem('lang');else localStorage.setItem('lang',value);}catch{}
 // Inter has no Sinhala letters, so load a Sinhala font only when it is needed.
 if(value==='si'&&!fontLoaded&&!document.getElementById('font-sinhala')){
  const link=document.createElement('link');
  link.id='font-sinhala';link.rel='stylesheet';
  link.href='https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(link);
 }
 fontLoaded=fontLoaded||value==='si';
});
