<script>
import { Check, ArrowRight } from '@lucide/svelte';
import Seo from '../Seo.svelte';
import FloatingBots from '../FloatingBots.svelte';
import { reveal } from '../reveal.js';
import { t, lang } from '../i18n.js';
import { SITE_URL, packages, delivery, serviceUrl } from '../data/services.js';
const bots=[{seed:'anuradha',size:96,top:'10px',left:'110px',delay:-1,tilt:-7},{seed:'ella',size:72,top:'96px',left:'20px',delay:-3,tilt:8}];
const jsonLd=[
 {'@type':'OfferCatalog','@id':SITE_URL+'/packages/#catalog',name:'Calcus AI service packages',url:SITE_URL+'/packages/',
  itemListElement:packages.map(pack=>({'@type':'Offer',url:SITE_URL+'/packages/#'+pack.slug,offeredBy:{'@id':SITE_URL+'/#organization'},areaServed:{'@type':'Country',name:'Sri Lanka'},
   itemOffered:{'@type':'Service',name:`${pack.name} — ${pack.tagline}`,description:`${pack.audience} Includes: ${pack.items.join(', ')}.`}}))},
 {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:'Packages',item:SITE_URL+'/packages/'}]}
];
</script>
<Seo title={$t('pk.meta')} description={$t('pk.metaDesc')} path="/packages/" {jsonLd}/>
<section class="section page-head">
 <FloatingBots {bots}/>
 <nav class="breadcrumbs" aria-label={$t('breadcrumb')}><a href="/">{$t('svc.home')}</a><span aria-hidden="true">/</span><span aria-current="page">{$t('nav.packages')}</span></nav>
 <div class="section-head" use:reveal><p class="kicker">{$t('pk.kicker')}</p><h1 class="page-title">{$t('pk.title')}</h1><p class="lede">{$t('pk.lede')}</p></div>
</section>
<section class="section">
 <div class="package-grid">
  {#each packages as pack,index (pack.slug)}
  <article class="package-card" id={pack.slug} use:reveal={(index%3)*80}>
   <div class="package-top spot-media m-{pack.tone}"><span class="package-icon"><pack.icon size={24} aria-hidden="true"/></span><h2>{pack.name}</h2><p>{$lang==='si'?pack.si:pack.tagline}</p></div>
   <div class="package-body">
    <p class="package-audience">{pack.audience}</p>
    <ul>{#each pack.items as item}<li><Check size={16} aria-hidden="true"/>{item}</li>{/each}</ul>
    <p class="package-label">{$t('pk.builtFrom')}</p>
    <div class="package-links">{#each pack.services as service}<a href={serviceUrl(service)}>{$lang==='si'?service.siTitle:service.title}</a>{/each}</div>
    <a class="button" href="/?service={pack.slug}#contact">{$t('pk.cta')} <ArrowRight size={16} aria-hidden="true"/></a>
   </div>
  </article>
  {/each}
 </div>
</section>
<section class="section">
 <div class="section-head" use:reveal><p class="kicker">{$t('delivery.kicker')}</p><h2>{$t('delivery.title')}</h2></div>
 <div class="why-grid">{#each delivery as item,index}<div class="why-card" use:reveal={index*70}><span class="delivery-number">0{index+1}</span><h3>{item.title}</h3><p>{item.text}</p></div>{/each}</div>
</section>
<section class="section">
 <div class="cta-band" use:reveal><div><h2>{$t('cta.title')}</h2><p>{$t('cta.text')}</p></div><div class="section-actions"><a class="button" href="/#contact">{$t('cta.button')}</a><a class="button button-soft" href="/services/">{$t('dir.all')}</a></div></div>
</section>
