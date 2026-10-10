<script>
import { Search, X, ArrowRight, MapPin, Check } from '@lucide/svelte';
import Seo from '../Seo.svelte';
import FloatingBots from '../FloatingBots.svelte';
import { reveal } from '../reveal.js';
import { t, lang } from '../i18n.js';
import { SITE_URL, categories, services, why, provinces, serviceUrl } from '../data/services.js';

let query='';
// Search matches titles, summaries and every bullet from servicelist.md, so "POS", "WhatsApp" or "O/L" all find something.
const haystack=Object.fromEntries(services.map(service=>[service.slug,[service.title,service.summary,service.siTitle,service.siSummary,...service.items].join(' ').toLowerCase()]));
$: terms=query.toLowerCase().split(/\s+/).filter(Boolean);
$: matches=service=>terms.every(term=>haystack[service.slug].includes(term));
$: visible=categories.map(category=>({...category,shown:category.services.filter(matches)})).filter(category=>category.shown.length);
$: found=visible.reduce((sum,category)=>sum+category.shown.length,0);
const bots=[{seed:'kandy',size:100,top:'20px',left:'110px',delay:0,tilt:-6},{seed:'nuwara',size:74,top:'0px',left:'10px',delay:-2,tilt:8},{seed:'colombo',size:66,top:'120px',left:'30px',delay:-4,tilt:-9}];
const jsonLd=[
 {'@type':'CollectionPage','@id':SITE_URL+'/services/#page',url:SITE_URL+'/services/',name:'Calcus AI services',about:{'@id':SITE_URL+'/#organization'},
  mainEntity:{'@type':'ItemList',numberOfItems:services.length,itemListElement:services.map((service,index)=>({'@type':'ListItem',position:index+1,url:SITE_URL+serviceUrl(service),name:service.title}))}},
 {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:'Services',item:SITE_URL+'/services/'}]}
];
</script>
<Seo title={$t('svcIndex.meta')} description={$t('svcIndex.metaDesc')} path="/services/" {jsonLd}/>
<section class="section page-head">
 <FloatingBots {bots}/>
 <nav class="breadcrumbs" aria-label={$t('breadcrumb')}><a href="/">{$t('svc.home')}</a><span aria-hidden="true">/</span><span aria-current="page">{$t('svc.services')}</span></nav>
 <div class="section-head" use:reveal><p class="kicker">{$t('svcIndex.kicker')}</p><h1 class="page-title">{$t('svcIndex.title')}</h1><p class="lede">{$t('svcIndex.lede')}</p></div>
 <form class="service-search" role="search" onsubmit={(event)=>event.preventDefault()} use:reveal>
  <Search size={18} aria-hidden="true"/>
  <input type="search" bind:value={query} placeholder={$t('search.placeholder')} aria-label={$t('search.label')}>
  {#if query}<button type="button" class="ask-close" aria-label={$t('search.clear')} onclick={()=>query=''}><X size={16} aria-hidden="true"/></button>{/if}
 </form>
 <div class="category-chips" use:reveal>{#each categories as category}<a href="#{category.slug}"><category.icon size={15} aria-hidden="true"/>{$lang==='si'?category.si:category.name}</a>{/each}</div>
 {#if terms.length}<p class="search-status" role="status">{found} {$t('search.results')}</p>{/if}
</section>

{#each visible as category (category.letter)}
<section class="section service-category" id={category.slug}>
 <div class="category-title" use:reveal><span class="category-icon tone-{category.tone}"><category.icon size={24} aria-hidden="true"/></span><div><p class="kicker">{category.letter} · {category.services.length} {$t('svcIndex.count')}</p><h2>{$lang==='si'?category.si:category.fullName}</h2></div></div>
 <div class="service-grid">
  {#each category.shown as service,index (service.slug)}
  <a class="service-card" href={serviceUrl(service)} use:reveal={(index%3)*70}>
   <span class="service-icon tone-{category.tone}"><service.icon size={22} aria-hidden="true"/></span>
   <h3>{$lang==='si'?service.siTitle:service.title}</h3>
   <p>{$lang==='si'?service.siSummary:service.summary}</p>
   <span class="service-more">{service.items.length} · {$t('svc.included')} <ArrowRight size={16} aria-hidden="true"/></span>
  </a>
  {/each}
 </div>
</section>
{/each}
{#if terms.length&&!found}<section class="section"><div class="empty-state"><p>{$t('search.none')}</p><a class="button" href="/#contact">{$t('cta.button')}</a></div></section>{/if}

<section class="section" id="why">
 <div class="section-head" use:reveal><p class="kicker">{$t('why.kicker')}</p><h2>{$t('why.title')}</h2></div>
 <div class="why-grid">{#each why as item,index}<div class="why-card" use:reveal={(index%4)*70}><Check size={18} aria-hidden="true"/><h3>{item.title}</h3><p>{item.text}</p></div>{/each}</div>
</section>

<section class="section" id="areas">
 <div class="section-head" use:reveal><p class="kicker">{$t('areas.kicker')}</p><h2>{$t('areas.title')}</h2><p class="lede">{$t('areas.lede')}</p></div>
 <div class="area-grid">{#each provinces as province,index}<div class="area-card" use:reveal={(index%3)*70}><h3><MapPin size={16} aria-hidden="true"/>{$lang==='si'?`${province.si} පළාත`:`${province.name} Province`}</h3><p>{province.districts.join(' · ')}</p></div>{/each}</div>
</section>

<section class="section">
 <div class="cta-band" use:reveal><div><h2>{$t('pkgTeaser.title')}</h2><p>{$t('pkgTeaser.text')}</p></div><div class="section-actions"><a class="button" href="/packages/">{$t('pkgTeaser.cta')}</a><a class="button button-soft" href="/#contact">{$t('cta.button')}</a></div></div>
</section>
