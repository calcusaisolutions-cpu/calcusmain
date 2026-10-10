<script>
// Per-page search and sharing metadata. Pages are pre-rendered, so crawlers and AI assistants see all of this as plain HTML.
import { SITE_URL, BRAND, COMPANY, categories, provinces, serviceUrl } from './data/services.js';
export let title;
export let description;
export let path='/';
export let jsonLd=[];
export let noindex=false;
const url=SITE_URL+path;
const image=SITE_URL+'/og-image.png';
// Site-wide identity: who Calcus AI is, where it works and what it offers. Every page carries it so any entry point is understood.
const organization={
 '@type':['Organization','ProfessionalService'],
 '@id':SITE_URL+'/#organization',
 name:BRAND,
 legalName:COMPANY.legalName,
 telephone:COMPANY.phone,
 contactPoint:{'@type':'ContactPoint',telephone:COMPANY.phone,contactType:'customer service',areaServed:'LK',availableLanguage:['English','Sinhala','Tamil']},
 alternateName:'CalcusAi',
 url:SITE_URL+'/',
 logo:SITE_URL+'/logo-small.png',
 image,
 description:'Sri Lankan technology company building AI-powered and traditional software: chatbots, automation, websites, mobile apps, business systems, e-commerce, LMS, cloud hosting and IoT for businesses across Sri Lanka.',
 slogan:'Every Digital Solution. One Trusted Partner.',
 address:{'@type':'PostalAddress',name:COMPANY.office,streetAddress:COMPANY.street,addressLocality:COMPANY.locality,addressRegion:COMPANY.region,addressCountry:'LK'},
 areaServed:[{'@type':'Country',name:'Sri Lanka'},...provinces.map(province=>({'@type':'AdministrativeArea',name:`${province.name} Province, Sri Lanka`}))],
 knowsLanguage:['en','si','ta'],
 hasOfferCatalog:{
  '@type':'OfferCatalog',name:'Calcus AI services',
  itemListElement:categories.map(category=>({
   '@type':'OfferCatalog',name:category.fullName,
   itemListElement:category.services.map(service=>({'@type':'Offer',itemOffered:{'@type':'Service',name:service.title,url:SITE_URL+serviceUrl(service)}}))
  }))
 }
};
const website={'@type':'WebSite','@id':SITE_URL+'/#website',url:SITE_URL+'/',name:BRAND,inLanguage:['en','si'],publisher:{'@id':SITE_URL+'/#organization'}};
$: graph=JSON.stringify({'@context':'https://schema.org','@graph':[organization,website,...jsonLd]}).replace(/</g,'\\u003c');
</script>
<svelte:head>
 <title>{title}</title>
 <meta name="description" content={description}>
 <link rel="canonical" href={url}>
 {#if noindex}<meta name="robots" content="noindex">{/if}
 <meta property="og:type" content="website">
 <meta property="og:site_name" content={BRAND}>
 <meta property="og:locale" content="en_LK">
 <meta property="og:title" content={title}>
 <meta property="og:description" content={description}>
 <meta property="og:url" content={url}>
 <meta property="og:image" content={image}>
 <meta property="og:image:width" content="1200">
 <meta property="og:image:height" content="630">
 <meta name="twitter:card" content="summary_large_image">
 <meta name="twitter:title" content={title}>
 <meta name="twitter:description" content={description}>
 <meta name="twitter:image" content={image}>
 <meta name="geo.region" content="LK">
 <meta name="geo.placename" content={`${COMPANY.locality}, ${COMPANY.country}`}>
 {@html `<script type="application/ld+json">${graph}</script>`}
</svelte:head>
