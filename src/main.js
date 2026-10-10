import { hydrate, mount } from 'svelte';
import App from './App.svelte';
import { restoreLanguage } from './i18n.js';
import './style.css';
// Pages arrive pre-rendered; hydrate makes that HTML interactive. In `npm run dev` there is no pre-rendered HTML, so mount instead.
const target=document.getElementById('app');
const props={url:location.pathname};
if(target.firstElementChild)hydrate(App,{target,props});else mount(App,{target,props});
restoreLanguage();
// Arriving from another page at /#contact or /services/#ai-automation: jump straight to that section once the page is ready.
if(location.hash){
 const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
 if(target)requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}));
}
