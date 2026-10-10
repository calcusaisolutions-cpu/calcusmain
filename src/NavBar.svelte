<script>
import { onMount } from 'svelte';
import { ArrowRight, ChevronDown, ChevronRight } from '@lucide/svelte';
import { t, lang } from './i18n.js';
import { categories, serviceUrl } from './data/services.js';
/** Which page is showing, so the right nav item is marked as current. */
export let page='home';
let open=false, scrolled=false, brandVisible=page!=='home', active='', closeTimer, root, trigger;
$: current=page==='services'||page==='service'?'services':page==='packages'?'packages':active;
function show(){clearTimeout(closeTimer);open=true;}
function hide(){clearTimeout(closeTimer);closeTimer=setTimeout(()=>open=false,180);}
function close(){clearTimeout(closeTimer);open=false;}
onMount(()=>{
 // On the home page, highlight whichever section is in view.
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)active=entry.target.id;},{rootMargin:'-45% 0px -50% 0px'});
 if(page==='home')for(const id of ['services','approach','contact']){const section=document.getElementById(id);if(section)observer.observe(section);}
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
 <a class="brand" class:brand-hidden={!brandVisible} inert={!brandVisible} href="/"><img src="/logo-small.webp" alt="" width="48" height="44"><span class="wordmark">Calcus<span>Ai</span></span><span class="sr-only">Calcus AI home</span></a>
 <nav aria-label={$t('nav.aria')}>
  <a href="/" class:active={page==='home'&&!active}><span class="nav-label">{$t('nav.home')}</span></a>
  <div class="menu" role="presentation" onmouseenter={show} onmouseleave={hide}>
   <button class="menu-trigger" class:active={current==='services'} class:open bind:this={trigger} aria-expanded={open} aria-controls="services-menu" onclick={()=>open?close():show()}><span class="nav-label">{$t('nav.services')}</span><ChevronDown size={15} aria-hidden="true"/></button>
  </div>
  <a href="/packages/" class:active={current==='packages'}><span class="nav-label">{$t('nav.packages')}</span></a>
  <a href="/#approach" class:active={current==='approach'}><span class="nav-label">{$t('nav.approach')}</span></a>
  <a href="/#contact" class:active={current==='contact'}><span class="nav-label">{$t('nav.contact')}</span></a>
 </nav>
 <div class="nav-actions"><a class="nav-services-mobile" href="/services/">{$t('nav.services')}</a><a class="nav-cta" href="/#contact">{$t('nav.cta')}</a></div>
 {#if open}
 <div class="mega" id="services-menu" role="region" aria-label={$t('mega.aria')} onmouseenter={show} onmouseleave={hide}>
  <div class="mega-grid mega-catalog">
   <div class="mega-categories">
    {#each categories as category}
    <div class="mega-group">
     <a class="mega-category" href="/services/#{category.slug}" onclick={close}><span class="mega-icon"><category.icon size={18} strokeWidth={1.7} aria-hidden="true"/></span>{$lang==='si'?category.si:category.name}</a>
     {#each category.services.slice(0,3) as service}<a class="mega-link" href={serviceUrl(service)} onclick={close}>{$lang==='si'?service.siTitle:service.title}</a>{/each}
     {#if category.services.length>3}<a class="mega-link mega-more" href="/services/#{category.slug}" onclick={close}>+{category.services.length-3} {$t('mega.more')}</a>{/if}
    </div>
    {/each}
   </div>
   <aside class="mega-feature">
    <p class="mega-label">{$t('nav.allServices')}</p>
    <div class="mega-feature-art"><img src="/logo-small.webp" alt="" width="256" height="234"></div>
    <strong>{$t('mega.allTitle')}</strong>
    <small>{$t('mega.allText')}</small>
    <a href="/services/" onclick={close}>{$t('mega.all')} <ArrowRight size={15} aria-hidden="true"/></a>
   </aside>
  </div>
  <div class="mega-footer">
   <a href="/services/" onclick={close}>{$t('mega.all')} <ChevronRight size={15} aria-hidden="true"/></a>
   <a href="/packages/" onclick={close}>{$t('mega.packages')} <ChevronRight size={15} aria-hidden="true"/></a>
   <a href="/#contact" onclick={close}>{$t('mega.talk')} <ChevronRight size={15} aria-hidden="true"/></a>
  </div>
 </div>
 {/if}
</header>
{#if open}<div class="nav-backdrop" aria-hidden="true"></div>{/if}
