// Turns servicelist.md (the source of truth for what Calcus AI offers) into src/data/catalog.json.
// Runs automatically before `npm run dev` and `npm run build`.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const source = readFileSync(new URL('../servicelist.md', import.meta.url), 'utf8').split('\n');
const clean = text => text.replace(/\*\*/g, '').replace(/^\*|\*$/g, '').trim();

const catalog = { categories: [], packages: [], why: [], customers: '', vision: '', delivery: [] };
let section = 'intro', category = null, service = null, pack = null;

for (const raw of source) {
 const line = raw.trim();
 if (!line || line === '---') continue;
 let match;
 if ((match = line.match(/^# ([A-I])\. (.+)$/))) {
  section = 'services';
  category = { letter: match[1], name: clean(match[2]), services: [] };
  catalog.categories.push(category);
  continue;
 }
 if (/^# OUR DELIVERY OPTIONS/.test(line)) { section = 'delivery'; continue; }
 if (/^# PROPOSED CALCUS AI SERVICE PACKAGES/.test(line)) { section = 'packages'; continue; }
 if (/^# WHY CHOOSE/.test(line)) { section = 'why'; continue; }
 if (/^# OUR TARGET CUSTOMERS/.test(line)) { section = 'customers'; continue; }
 if (/^# OUR VISION/.test(line)) { section = 'vision'; continue; }
 if (/^# /.test(line)) { section = 'other'; continue; }

 if (section === 'services') {
  if ((match = line.match(/^## (\d+)\. (.+)$/))) {
   service = { number: match[1], title: clean(match[2]), items: [], notes: [] };
   category.services.push(service);
  } else if (service && line.startsWith('- ')) service.items.push(clean(line.slice(2)).replace(/\.$/, ''));
  else if (service && /^\*.+\*$/.test(line)) service.notes.push(clean(line));
 } else if (section === 'delivery') {
  if ((match = line.match(/^\*\*\d\. (.+?):\*\* (.+)$/))) catalog.delivery.push({ title: match[1], text: match[2] });
 } else if (section === 'packages') {
  if ((match = line.match(/^### (.+?) — (.+)$/))) { pack = { name: clean(match[1]), tagline: clean(match[2]), audience: '', items: [] }; catalog.packages.push(pack); }
  else if (pack && line.startsWith('- ')) pack.items.push(clean(line.slice(2)).replace(/\.$/, ''));
  else if (pack && /^For /.test(line)) pack.audience = line;
 } else if (section === 'why') {
  if ((match = line.match(/^- \*\*(.+?):\*\* (.+)$/))) catalog.why.push({ title: match[1], text: match[2] });
 } else if (section === 'customers') {
  catalog.customers = clean(line);
 } else if (section === 'vision' && !catalog.vision) {
  catalog.vision = clean(line);
 }
}

const services = catalog.categories.flatMap(c => c.services);
if (catalog.categories.length !== 9 || services.length !== 35 || catalog.packages.length !== 9) {
 throw new Error(`servicelist.md parsed to ${catalog.categories.length} categories, ${services.length} services, ${catalog.packages.length} packages — check its headings.`);
}
mkdirSync(new URL('../src/data/', import.meta.url), { recursive: true });
writeFileSync(new URL('../src/data/catalog.json', import.meta.url), JSON.stringify(catalog, null, 1) + '\n');
console.log(`catalog: ${catalog.categories.length} categories, ${services.length} services, ${catalog.packages.length} packages`);
