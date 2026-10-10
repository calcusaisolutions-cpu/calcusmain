<script>
import { ArrowLeft, ArrowRight, Check, Info, MapPin, Plus } from '@lucide/svelte';
import Seo from '../Seo.svelte';
import { reveal } from '../reveal.js';
import { t, lang } from '../i18n.js';
import { SITE_URL, services, categoryByLetter, packagesForService, provinces, serviceUrl } from '../data/services.js';
export let service;

$: category=categoryByLetter[service.category];
$: index=services.indexOf(service);
$: previous=services[(index+services.length-1)%services.length];
$: next=services[(index+1)%services.length];
$: related=category.services.filter(item=>item!==service).slice(0,6);
$: inPackages=packagesForService(service.number);
$: pageTitle=service.title.length<=38?`${service.title} in Sri Lanka | Calcus AI`:`${service.title} | Calcus AI`;
$: description=`${service.summary} ${$t('svc.metaTail')}`;
$: path=serviceUrl(service);
$: faqs=[1,2,3,4].map(n=>({q:$t(`faq.q${n}`),a:$t(`faq.a${n}`)}));
// The bot on the hero tile matches the category colour.
const botFor={green:'colombo',blue:'kandy',orange:'nuwara',dark:'ella'};
// Structured data stays in English so search engines read one consistent version of each page.
const englishFaqs=[
 ['Do you work with customers all over Sri Lanka?','Yes. Our HQ is in Maharagama and we work with customers across all of Sri Lanka, from Jaffna to Galle and Kandy to Batticaloa. Most work happens remotely, with on-site visits where agreed.'],
 ['Can it work in Sinhala, Tamil and English?','Yes. We design for Sinhala, Tamil and English users, so your customers and staff can use the system in the language they are most comfortable with.'],
 ['Does it have to use AI?','No. We build both AI-powered and traditional non-AI systems, and only add AI where it genuinely adds value for your business.'],
 ['How do we get started?','Tell us about your business and what you need through the contact form. We start with a focused conversation and, where it helps, a small prototype before building the full solution.']
];
$: jsonLd=[
 {'@type':'Service','@id':SITE_URL+path+'#service',name:service.title,serviceType:service.title,description:service.summary,url:SITE_URL+path,
  category:category.fullName,provider:{'@id':SITE_URL+'/#organization'},availableLanguage:['English','Sinhala','Tamil'],
  areaServed:[{'@type':'Country',name:'Sri Lanka'},...provinces.map(province=>({'@type':'AdministrativeArea',name:`${province.name} Province`}))],
  hasOfferCatalog:{'@type':'OfferCatalog',name:`${service.title} — what's included`,itemListElement:service.items.map(item=>({'@type':'Offer',itemOffered:{'@type':'Service',name:item}}))}},
 {'@type':'BreadcrumbList',itemListElement:[
  {'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},
  {'@type':'ListItem',position:2,name:'Services',item:SITE_URL+'/services/'},
  {'@type':'ListItem',position:3,name:category.fullName,item:SITE_URL+'/services/#'+category.slug},
  {'@type':'ListItem',position:4,name:service.title,item:SITE_URL+path}]},
 {'@type':'FAQPage',mainEntity:englishFaqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
];
</script>
<Seo title={pageTitle} {description} {path} {jsonLd}/>
<section class="section page-head service-hero">
 <nav class="breadcrumbs" aria-label={$t('breadcrumb')}><a href="/">{$t('svc.home')}</a><span aria-hidden="true">/</span><a href="/services/">{$t('svc.services')}</a><span aria-hidden="true">/</span><a href="/services/#{category.slug}">{$lang==='si'?category.si:category.name}</a></nav>
 <div class="service-hero-grid">
  <div use:reveal>
   <p class="kicker"><a href="/services/#{category.slug}">{category.letter}{service.number} · {$lang==='si'?category.si:category.fullName}</a></p>
   <h1 class="page-title">{$lang==='si'?service.siTitle:service.title}</h1>
   <p class="lede">{$lang==='si'?service.siSummary:service.summary}</p>
   <div class="section-actions"><a class="button" href="/?service={service.slug}#contact">{$t('svc.talk')}</a><a class="button button-soft" href="/packages/">{$t('svc.packagesCta')}</a></div>
  </div>
  <div class="service-visual spot-media m-{category.tone}" use:reveal={120} aria-hidden="true">
   <img src="/bots/{botFor[category.tone]}.svg" alt="" width="180" height="180">
   <span class="service-visual-icon"><service.icon size={28}/></span>
  </div>
 </div>
</section>

<section class="section">
 <div class="included" use:reveal>
  <h2>{$t('svc.included')}</h2>
  <ul class="included-list">{#each service.items as item}<li><Check size={18} aria-hidden="true"/><span>{item}</span></li>{/each}</ul>
  {#each service.notes as note}<p class="service-note"><Info size={18} aria-hidden="true"/><span><strong>{$t('svc.note')}:</strong> {note}</span></p>{/each}
 </div>
 <div class="area-strip" use:reveal><MapPin size={18} aria-hidden="true"/><p>{$t('svc.areas')}</p><a href="/services/#areas">{$t('svc.allAreas')} <ArrowRight size={15} aria-hidden="true"/></a></div>
</section>

{#if inPackages.length}
<section class="section">
 <div class="section-head" use:reveal><h2>{$t('svc.packages')}</h2></div>
 <div class="package-mini-grid">{#each inPackages as pack,i}<a class="package-mini tone-border-{pack.tone}" href="/packages/#{pack.slug}" use:reveal={i*80}><span class="service-icon tone-{pack.tone}"><pack.icon size={20} aria-hidden="true"/></span><div><strong>{pack.name}</strong><small>{$lang==='si'?pack.si:pack.tagline}</small></div><ArrowRight size={18} aria-hidden="true"/></a>{/each}</div>
</section>
{/if}

<section class="section">
 <div class="section-head" use:reveal><h2>{$t('svc.faq')}</h2></div>
 <div class="faq-list" use:reveal>{#each faqs as faq}<details><summary>{faq.q}<Plus size={18} aria-hidden="true"/></summary><p>{faq.a}</p></details>{/each}</div>
</section>

<section class="section">
 <div class="section-head" use:reveal><p class="kicker">{$lang==='si'?category.si:category.fullName}</p><h2>{$t('svc.related')}</h2></div>
 {#if related.length}
 <div class="service-grid">{#each related as item,i (item.slug)}<a class="service-card" href={serviceUrl(item)} use:reveal={(i%3)*70}><span class="service-icon tone-{category.tone}"><item.icon size={22} aria-hidden="true"/></span><h3>{$lang==='si'?item.siTitle:item.title}</h3><p>{$lang==='si'?item.siSummary:item.summary}</p><span class="service-more">{$t('svc.included')} <ArrowRight size={16} aria-hidden="true"/></span></a>{/each}</div>
 {/if}
 <nav class="prev-next" aria-label={$t('svc.services')}>
  <a href={serviceUrl(previous)}><ArrowLeft size={18} aria-hidden="true"/><span><small>{$t('svc.prev')}</small>{$lang==='si'?previous.siTitle:previous.title}</span></a>
  <a href={serviceUrl(next)}><span><small>{$t('svc.next')}</small>{$lang==='si'?next.siTitle:next.title}</span><ArrowRight size={18} aria-hidden="true"/></a>
 </nav>
</section>

<section class="section">
 <div class="cta-band" use:reveal><div><h2>{$t('cta.title')}</h2><p>{$t('cta.text')}</p></div><div class="section-actions"><a class="button" href="/?service={service.slug}#contact">{$t('svc.talk')}</a><a class="button button-soft" href="/services/">{$t('dir.all')}</a></div></div>
</section>
