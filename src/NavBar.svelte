<script>
import { onMount } from 'svelte';
import { ArrowRight, ChevronDown, ChevronRight, Bot, Workflow, Box, AppWindow } from '@lucide/svelte';
import { t } from './i18n.js';
export let service='';
let open=false, scrolled=false, brandVisible=false, active='', closeTimer, root, trigger;
$: groups=[
 {title:$t('mega.groupAi'),items:[
  {icon:Bot,name:$t('svc.ai'),text:$t('mega.aiText'),value:'AI solutions'},
  {icon:Workflow,name:$t('svc.auto'),text:$t('mega.autoText'),value:'Business automation'}]},
 {title:$t('mega.groupBuild'),items:[
  {icon:Box,name:$t('svc.web'),text:$t('mega.webText'),value:'Interactive website'},
  {icon:AppWindow,name:$t('svc.soft'),text:$t('mega.softText'),value:'Digital product'}]}
];
function show(){clearTimeout(closeTimer);open=true;}
function hide(){clearTimeout(closeTimer);closeTimer=setTimeout(()=>open=false,180);}
function close(){clearTimeout(closeTimer);open=false;}
function choose(value){service=value;close();}
onMount(()=>{
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)active=entry.target.id;},{rootMargin:'-45% 0px -50% 0px'});
 for(const id of ['services','approach','contact']){const section=document.getElementById(id);if(section)observer.observe(section);}
 const key=event=>{if(event.key==='Escape'&&open){close();trigger?.focus();}};
 const outside=event=>{if(open&&!root.contains(event.target))close();};
 // The navbar logo stays hidden while the big hero wordmark is on screen, and fades in once it scrolls up under the navbar.
 const wordmark=document.querySelector('.hero-wordmark');
 const scroll=()=>{scrolled=scrollY>8;brandVisible=!wordmark||wordmark.getBoundingClientRect().bottom<root.offsetHeight;};scroll();
 addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});addEventListener('keydown',key);addEventListener('pointerdown',outside);
 return()=>{observer.disconnect();removeEventListener('scroll',scroll);removeEventListener('resize',scroll);removeEventListener('keydown',key);removeEventListener('pointerdown',outside);clearTimeout(closeTimer);};
});
</script>
<header class:scrolled bind:this={root}>
 <a class="brand" class:brand-hidden={!brandVisible} inert={!brandVisible} href="#home"><img src="/logo-small.webp" alt="" width="48" height="44"><span class="wordmark">Calcus<span>Ai</span></span></a>
 <nav aria-label={$t('nav.aria')}>
  <a href="#home"><span class="nav-label">{$t('nav.home')}</span></a>
  <div class="menu" role="presentation" onmouseenter={show} onmouseleave={hide}>
   <button class="menu-trigger" class:active={active==='services'} class:open bind:this={trigger} aria-expanded={open} aria-controls="services-menu" onclick={()=>open?close():show()}><span class="nav-label">{$t('nav.services')}</span><ChevronDown size={15} aria-hidden="true"/></button>
  </div>
  <a href="#approach" class:active={active==='approach'}><span class="nav-label">{$t('nav.approach')}</span></a>
  <a href="#contact" class:active={active==='contact'}><span class="nav-label">{$t('nav.contact')}</span></a>
 </nav>
 <a class="nav-cta" href="#contact">{$t('nav.cta')}</a>
 {#if open}
 <div class="mega" id="services-menu" role="region" aria-label={$t('mega.aria')} onmouseenter={show} onmouseleave={hide}>
  <div class="mega-grid">
   {#each groups as group}
   <div class="mega-group">
    <p class="mega-label">{group.title}</p>
    {#each group.items as item}
    <a class="mega-item" href="#contact" onclick={()=>choose(item.value)}><span class="mega-icon"><item.icon size={21} strokeWidth={1.6} aria-hidden="true"/></span><span><strong>{item.name}</strong><small>{item.text}</small></span></a>
    {/each}
   </div>
   {/each}
   <aside class="mega-feature">
    <p class="mega-label">{$t('mega.how')}</p>
    <div class="mega-feature-art"><img src="/logo-small.webp" alt="" width="256" height="234"></div>
    <span class="mega-kicker">{$t('mega.kicker')}</span>
    <strong>{$t('mega.title')}</strong>
    <small>{$t('mega.text')}</small>
    <a href="#approach" onclick={close}>{$t('mega.link')} <ArrowRight size={15} aria-hidden="true"/></a>
   </aside>
  </div>
  <div class="mega-footer">
   <a href="#services" onclick={close}>{$t('mega.all')} <ChevronRight size={15} aria-hidden="true"/></a>
   <a href="#approach" onclick={close}>{$t('nav.approach')} <ChevronRight size={15} aria-hidden="true"/></a>
   <a href="#contact" onclick={close}>{$t('mega.talk')} <ChevronRight size={15} aria-hidden="true"/></a>
  </div>
 </div>
 {/if}
</header>
{#if open}<div class="nav-backdrop" aria-hidden="true"></div>{/if}
