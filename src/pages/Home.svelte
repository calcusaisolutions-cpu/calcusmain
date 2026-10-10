<script>
import { tick, onMount } from 'svelte';
import { ArrowUp, X, ArrowUpRight, ArrowRight, ArrowLeft, Bot, Send, Mail, Zap, Check, MessageCircle, ChartColumn, Box, LayoutGrid, Users, FlaskConical, Lightbulb } from '@lucide/svelte';
import Mascot from '../Mascot.svelte';
import MeshBackground from '../MeshBackground.svelte';
import FloatingBots from '../FloatingBots.svelte';
import Seo from '../Seo.svelte';
import LightText from '../LightText.svelte';
import { reveal } from '../reveal.js';
import { partners } from '../data/partners.js';
import { t, lang } from '../i18n.js';
import { categories, packages, serviceBySlug, serviceUrl, COMPANY, COMPANY_MAP, APILAGE } from '../data/services.js';
let name='',email='',service='Not sure yet',message='',statusKey='',sending=false;
$: status=statusKey?$t(statusKey):'';
// The service cards scroll sideways; the arrow buttons move one card at a time.
let rail;
function slide(direction){
 const card=rail?.querySelector('.feature-card');if(!card)return;
 rail.scrollBy({left:direction*(card.getBoundingClientRect().width+20),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}
// Service pages link here as /?service=<slug>#contact so the form arrives with that service selected.
onMount(()=>{
 const wanted=new URLSearchParams(location.search).get('service');
 const match=wanted&&(serviceBySlug[wanted]?.title||packages.find(pack=>pack.slug===wanted)?.name);
 if(match)service=match;
});
// "I don't know how?": the mascot asks what the visitor does, watches them type, then carries the answer to the contact form.
let asking=false,idea='',cloudKey='',look=null,ideaInput,handoff;
$: cloud=cloudKey?$t(cloudKey):'';
let measure;
async function startAsking(){clearTimeout(handoff);asking=true;cloudKey='ask.prompt';await tick();ideaInput?.focus({preventScroll:true});}
async function stopAsking(){clearTimeout(handoff);asking=false;cloudKey='';look=null;await tick();document.querySelector('.hero-actions .button-soft')?.focus({preventScroll:true});}
function trackCaret(){
 if(!ideaInput)return;
 const style=getComputedStyle(ideaInput),rect=ideaInput.getBoundingClientRect();
 measure??=document.createElement('canvas').getContext('2d');
 measure.font=style.font;
 const before=ideaInput.value.slice(0,ideaInput.selectionStart??ideaInput.value.length);
 const x=rect.left+parseFloat(style.paddingLeft)+measure.measureText(before).width-ideaInput.scrollLeft;
 look={x:Math.min(x,rect.right-parseFloat(style.paddingRight)),y:rect.top+rect.height/2};
}
function sendIdea(){
 const text=idea.trim();if(!text){ideaInput?.focus();return;}
 look=null;cloudKey='ask.reply';
 message=message.trim()?`${message.trim()}\n\n${text}`:text;
 handoff=setTimeout(()=>{asking=false;cloudKey='';idea='';document.getElementById('contact')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});},2200);
}
$: ideas=[
 {icon:MessageCircle,tone:'blue',title:$t('idea.1'),href:'/services/ai-chatbots-voice-assistants/'},
 {icon:ChartColumn,tone:'orange',title:$t('idea.2'),href:'/services/business-automation-ai-workflows/'},
 {icon:Box,tone:'green',title:$t('idea.3'),href:'/services/website-design-development/'},
 {icon:LayoutGrid,tone:'dark',title:$t('idea.4'),href:'/services/systems-integration-data-engineering/'}
];
$: principles=[
 {tone:'green',icon:Users,number:'01',title:$t('p1.title'),text:$t('p1.text')},
 {tone:'blue',icon:FlaskConical,number:'02',title:$t('p2.title'),text:$t('p2.text')},
 {tone:'orange',icon:Lightbulb,number:'03',title:$t('p3.title'),text:$t('p3.text')}
];
const serviceBots=[
 {seed:'colombo',size:104,top:'34px',left:'118px',delay:0,tilt:-6},
 {seed:'ella',size:78,top:'0px',left:'10px',delay:-2,tilt:8},
 {seed:'nuwara',size:70,top:'128px',left:'20px',delay:-4,tilt:-10}
];
const approachBots=[
 {seed:'negombo',size:86,top:'10px',left:'40px',delay:-1,tilt:7},
 {seed:'kandy',size:96,top:'86px',left:'140px',delay:-3,tilt:-7}
];
const contactBots=[
 {seed:'anuradha',size:92,top:'0px',left:'110px',delay:-2,tilt:-8},
 {seed:'colombo',size:64,top:'92px',left:'40px',delay:-5,tilt:9}
];
const spotlightItems=[
 {media:'blue',image:'/bots/kandy.svg',href:'/services/ai-chatbots-voice-assistants/'},
 {media:'orange',image:'/bots/nuwara.svg',href:'/services/business-automation-ai-workflows/'},
 {media:'green',image:'/logo-medium.webp',href:'/services/website-design-development/'},
 {media:'dark',image:'/bots/ella.svg',href:'/services/custom-software-development/'},
 {media:'map',image:'/sri-lanka-network.svg',href:'/services/#areas'}
];
$: spotlights=spotlightItems.map((item,index)=>({...item,title:$t(`spot.${index+1}.title`),tag:$t(`spot.${index+1}.tag`),note:$t(`spot.${index+1}.note`)}));
const salesBars=[34,48,42,60,55,72,86];
const bars=[38,52,44,63,58,72,66,88];
async function submit(){sending=true;statusKey='';try{const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,service,message})});if(!response.ok)throw new Error();statusKey='form.saved';name='';email='';message='';}catch{statusKey='form.failed';}finally{sending=false;}}
</script>
<Seo title="Calcus AI — AI, Software & Digital Solutions in Sri Lanka" description="AI chatbots, automation, websites, apps, POS and business systems, e-commerce and cloud for businesses across Sri Lanka — in Sinhala, Tamil and English." path="/"/>
<svelte:head><link rel="preload" as="image" href="/logo.webp" type="image/webp" fetchpriority="high"></svelte:head>
<section class="hero" id="home">
 <MeshBackground className="hero-mesh" cell={46} radius={140}/>
 <div class="hero-art hero-composition">
  <div class="hero-canvas">
   <img class="network-map" src="/sri-lanka-network.svg" alt={$t('hero.mapAlt')} width="450" height="600">
   <h1 class="hero-wordmark">Calcus<em>Ai</em><span class="sr-only"> — AI, software and digital solutions across Sri Lanka</span></h1>
   <Mascot {look} {cloud} alt={$t('hero.mascotAlt')}/>
  </div>
 </div>
 <div class="hero-caption"><p class="intro">{$t('hero.intro')}</p><div class="hero-cta" class:asking>
  <div class="hero-actions" inert={asking}><a class="button" href="#contact">{$t('hero.explore')}</a><button type="button" class="button button-soft" onclick={startAsking}>{$t('hero.dunno')}</button></div>
  <form class="ask-box" inert={!asking} onsubmit={(event)=>{event.preventDefault();sendIdea();}}>
   <input bind:this={ideaInput} bind:value={idea} maxlength="300" placeholder={$t('ask.placeholder')} aria-label={$t('ask.label')} oninput={trackCaret} onkeyup={trackCaret} onkeydown={(event)=>{if(event.key==='Escape')stopAsking();}} onclick={trackCaret} onfocus={trackCaret} onblur={()=>look=null}>
   <button class="ask-send" aria-label={$t('ask.send')}><ArrowUp size={18} aria-hidden="true"/></button>
   <button type="button" class="ask-close" aria-label={$t('ask.close')} onclick={stopAsking}><X size={16} aria-hidden="true"/></button>
  </form>
 </div></div>
</section>
<section class="partners" aria-labelledby="partners-title">
 <p class="partners-title" id="partners-title">{$t('partners.title')}</p>
 <!-- The list is drawn twice side by side so the strip can scroll in an endless loop; the copy is hidden from screen readers. -->
 <div class="partner-marquee">
  {#each [0,1] as copy}<ul class="partner-logos" aria-hidden={copy?'true':undefined}>{#each partners as partner}<li style="--brand:{partner.color}"><svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd" aria-hidden="true">{@html partner.paths}</svg><span>{partner.name}</span></li>{/each}</ul>{/each}
 </div>
</section>
<section class="spotlight" aria-labelledby="spotlight-title">
 <div class="spotlight-feature" use:reveal>
  <a class="spotlight-panel" href="/services/">
   <div class="spot-demo" aria-hidden="true">
    <div class="spot-col">
     <div class="spot-widget green"><div class="sw-head"><span>{$t('spot.sales')}</span><strong>+18%</strong></div><div class="sw-bars">{#each salesBars as height}<i style="height:{height}%"></i>{/each}</div></div>
     <div class="spot-prompt">{$t('spot.summarise')}</div>
     <div class="spot-widget orange"><div class="sw-head"><span>{$t('spot.draft')}</span><strong>{$t('spot.ready')}</strong></div><b></b><b></b><b class="short"></b></div>
     <div class="spot-prompt">{$t('spot.reply')}</div>
    </div>
    <p class="spot-headline">{$t('spot.headline')}</p>
   </div>
  </a>
  <h2 class="spotlight-title" id="spotlight-title">{$t('spot.title')}</h2>
 </div>
 <div class="spotlight-list">
  {#each spotlights as item}<a class="spot-card" use:reveal href={item.href}><div class="spot-media m-{item.media}"><img src={item.image} alt="" loading="lazy"></div><h3>{item.title}</h3><p class="spot-meta"><span>{item.tag}</span><span>{item.note}</span></p></a>{/each}
 </div>
</section>
<section class="section mission" aria-label={$t('mission.label')}>
 <LightText label={$t('mission.label')} text={$t('mission.text')}/>
</section>
<section class="section" id="services">
 <FloatingBots bots={serviceBots}/>
 <div class="section-head" use:reveal><p class="kicker">{$t('services.kicker')}</p><h2>{$t('services.title')}</h2><p class="lede">{$t('services.lede')}</p></div>
 <div class="feature-rail-controls" aria-hidden="true"><button type="button" tabindex="-1" onclick={()=>slide(-1)}><ArrowLeft size={18}/></button><button type="button" tabindex="-1" onclick={()=>slide(1)}><ArrowRight size={18}/></button></div>
 <div class="feature-grid" bind:this={rail}>
  <a class="feature-card" use:reveal={0} href="/services/ai-chatbots-voice-assistants/">
   <div class="feature-copy"><p class="feature-label">{$t('svc.ai')}</p><h3>{$t('f1.title')}</h3><span class="round-arrow"><ArrowRight size={20} aria-hidden="true"/></span></div>
   <div class="mock" aria-hidden="true">
    <div class="mock-bar"><Bot size={16}/><strong>{$t('f1.bar')}</strong><span class="mock-pill">{$t('f1.online')}</span></div>
    <div class="bubble user">{$t('f1.user')}</div>
    <div class="bubble bot">{$t('f1.bot')}</div>
    <div class="mock-input">{$t('f1.ask')}<span class="send"><Send size={14}/></span></div>
   </div>
  </a>
  <a class="feature-card" use:reveal={90} href="/services/business-automation-ai-workflows/">
   <div class="feature-copy"><p class="feature-label">{$t('svc.auto')}</p><h3>{$t('f2.title')}</h3><span class="round-arrow"><ArrowRight size={20} aria-hidden="true"/></span></div>
   <div class="mock" aria-hidden="true">
    <div class="mock-bar"><Zap size={16}/><strong>{$t('f2.bar')}</strong><span class="mock-pill blue">{$t('f2.running')}</span></div>
    <div class="flow-step"><span class="flow-icon tone-blue"><Mail size={16}/></span><div><strong>{$t('f2.s1')}</strong><small>{$t('f2.s1n')}</small></div></div>
    <span class="flow-line"></span>
    <div class="flow-step"><span class="flow-icon tone-orange"><Zap size={16}/></span><div><strong>{$t('f2.s2')}</strong><small>{$t('f2.s2n')}</small></div></div>
    <span class="flow-line"></span>
    <div class="flow-step"><span class="flow-icon tone-green"><Check size={16}/></span><div><strong>{$t('f2.s3')}</strong><small>{$t('f2.s3n')}</small></div><span class="mock-pill">{$t('f2.done')}</span></div>
   </div>
  </a>
  <a class="feature-card" use:reveal={0} href="/services/website-design-development/">
   <div class="feature-copy"><p class="feature-label">{$t('svc.web')}</p><h3>{$t('f3.title')}</h3><span class="round-arrow"><ArrowRight size={20} aria-hidden="true"/></span></div>
   <div class="mock mock-browser" aria-hidden="true">
    <div class="browser-bar"><i></i><i></i><i></i><span>yourbrand.lk</span></div>
    <div class="browser-body"><div class="lines"><b></b><b></b><b></b><b></b><span class="mini-btn"></span></div><div class="orb"></div></div>
   </div>
  </a>
  <a class="feature-card" use:reveal={90} href="/services/custom-software-development/">
   <div class="feature-copy"><p class="feature-label">{$t('svc.soft')}</p><h3>{$t('f4.title')}</h3><span class="round-arrow"><ArrowRight size={20} aria-hidden="true"/></span></div>
   <div class="mock" aria-hidden="true">
    <div class="mock-bar"><LayoutGrid size={16}/><strong>{$t('f4.bar')}</strong><span class="mock-pill">{$t('f4.live')}</span></div>
    <div class="dash-stats"><div><small>{$t('f4.orders')}</small><strong>128</strong></div><div><small>{$t('f4.tasks')}</small><strong>14</strong></div><div><small>{$t('f4.ontime')}</small><strong>96%</strong></div></div>
    <div class="dash-chart">{#each bars as height}<span style="height:{height}%"></span>{/each}</div>
   </div>
  </a>
 </div>
 <p class="row-title" use:reveal>{$t('ideas.title')}</p>
 <div class="idea-row">{#each ideas as idea,index}<a class="idea-card" use:reveal={index*80} href={idea.href}><span class="idea-icon tone-{idea.tone}"><idea.icon size={24} aria-hidden="true"/></span><strong>{idea.title} <ArrowRight size={18} aria-hidden="true"/></strong></a>{/each}</div>
</section>
<section class="section" id="all-services">
 <div class="section-head" use:reveal><p class="kicker">{$t('dir.kicker')}</p><h2>{$t('dir.title')}</h2><p class="lede">{$t('dir.lede')}</p></div>
 <div class="category-grid">
  {#each categories as category,index}
  <div class="category-card" use:reveal={(index%3)*80}>
   <a class="category-head" href="/services/#{category.slug}"><span class="category-icon tone-{category.tone}"><category.icon size={22} aria-hidden="true"/></span><strong>{$lang==='si'?category.si:category.name}</strong><ArrowRight size={18} aria-hidden="true"/></a>
   <ul>{#each category.services as item}<li><a href={serviceUrl(item)}>{$lang==='si'?item.siTitle:item.title}</a></li>{/each}</ul>
  </div>
  {/each}
 </div>
 <div class="section-actions" use:reveal><a class="button" href="/services/">{$t('dir.all')}</a><a class="button button-soft" href="/packages/">{$t('pkgTeaser.cta')}</a></div>
</section>
<section class="section" id="apilageai">
 <div class="showcase" use:reveal>
  <div class="showcase-copy">
   <p class="kicker showcase-kicker"><Lightbulb size={16} aria-hidden="true"/>{$t('show.kicker')}</p>
   <h2>{$t('show.title')}</h2>
   <p class="lede"><strong class="apilage-name">ApilageAI</strong> {$t('show.lede')}</p>
   <ul class="showcase-points">
    <li><span class="idea-icon tone-blue"><MessageCircle size={18} aria-hidden="true"/></span>{$t('show.p1')}</li>
    <li><span class="idea-icon tone-green"><Users size={18} aria-hidden="true"/></span>{$t('show.p2')}</li>
    <li><span class="idea-icon tone-orange"><Bot size={18} aria-hidden="true"/></span>{$t('show.p3')}</li>
    <li><span class="idea-icon tone-dark"><ChartColumn size={18} aria-hidden="true"/></span>{$t('show.p4')}</li>
   </ul>
   <div class="section-actions">{#if APILAGE.url}<a class="button" href={APILAGE.url} target="_blank" rel="noopener">{$t('show.visit')} <ArrowUpRight size={16} aria-hidden="true"/></a>{/if}<a class={APILAGE.url?'button button-soft':'button'} href="/services/ai-education-syllabus-learning/">{$t('show.more')}</a></div>
  </div>
  <div class="showcase-visual"><img src="/apilageai-laptop.webp" alt={$t('show.alt')} width="2000" height="1149" loading="lazy" decoding="async"></div>
 </div>
</section>
<section class="section" id="approach">
 <FloatingBots bots={approachBots}/>
 <div class="section-head" use:reveal><p class="kicker">{$t('approach.kicker')}</p><h2>{$t('approach.title')}</h2><p class="lede">{$t('approach.lede')}</p></div>
 <div class="principle-grid">{#each principles as principle,index}<article use:reveal={index*100} class="principle-card tone-{principle.tone}"><div class="principle-top"><span>{principle.number}</span><principle.icon size={24} aria-hidden="true"/></div><span class="principle-art" aria-hidden="true"><principle.icon size={230} strokeWidth={0.8}/></span><h3>{principle.title}</h3><p>{principle.text}</p></article>{/each}</div>
</section>
<section class="section" id="contact">
 <FloatingBots bots={contactBots}/>
 <div class="section-head" use:reveal><p class="kicker">{$t('contact.kicker')}</p><h2>{$t('contact.title')}</h2></div>
 <div class="contact-card" use:reveal><div class="contact-copy"><p class="feature-label">{$t('contact.label')}</p><h3>{$t('contact.heading')}</h3><p>{$t('contact.text')}</p><a class="contact-location" href={COMPANY_MAP} rel="noopener" target="_blank">{COMPANY.office} · {COMPANY.street}, {COMPANY.locality} <ArrowUpRight size={15} aria-hidden="true"/></a></div><form onsubmit={(event)=>{event.preventDefault();submit();}}><label>{$t('form.name')}<input bind:value={name} required maxlength="100" autocomplete="name" placeholder={$t('form.namePh')}></label><label>{$t('form.email')}<input bind:value={email} required type="email" maxlength="254" autocomplete="email" placeholder="you@company.com"></label><label>{$t('form.service')}<select bind:value={service}><option value="Not sure yet">{$t('opt.unsure')}</option>{#each categories as category}<optgroup label={$lang==='si'?category.si:category.name}>{#each category.services as item}<option value={item.title}>{$lang==='si'?item.siTitle:item.title}</option>{/each}</optgroup>{/each}<optgroup label={$t('opt.packages')}>{#each packages as pack}<option value={pack.name}>{pack.name}</option>{/each}</optgroup></select></label><label>{$t('form.message')}<textarea bind:value={message} required minlength="10" maxlength="5000" rows="3" placeholder={$t('form.messagePh')}></textarea></label><button class="button" disabled={sending}>{sending?$t('form.sending'):$t('form.send')}</button><p class="form-status" role="status">{status}</p></form></div>
</section>
