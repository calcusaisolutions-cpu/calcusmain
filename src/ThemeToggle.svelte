<script>
import { onMount } from 'svelte';
import { Monitor, Sun, Moon } from '@lucide/svelte';
import { t } from './i18n.js';
const options=[{value:'system',icon:Monitor},{value:'light',icon:Sun},{value:'dark',icon:Moon}];
let theme='system';
const media=typeof matchMedia==='function'?matchMedia('(prefers-color-scheme: dark)'):null;
function apply(){
 const root=document.documentElement;
 if(theme==='system')delete root.dataset.theme;else root.dataset.theme=theme;
 const dark=theme==='dark'||(theme==='system'&&media?.matches);
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#191919':'#ffffff');
}
function choose(value){theme=value;try{if(value==='system')localStorage.removeItem('theme');else localStorage.setItem('theme',value);}catch{}apply();}
function key(event,index){
 if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(event.key))return;
 event.preventDefault();
 const next=(index+(event.key==='ArrowRight'||event.key==='ArrowDown'?1:options.length-1))%options.length;
 choose(options[next].value);
 event.currentTarget.parentElement.children[next].focus();
}
onMount(()=>{
 try{const saved=localStorage.getItem('theme');if(saved==='light'||saved==='dark')theme=saved;}catch{}
 apply();
 const change=()=>{if(theme==='system')apply();};
 media?.addEventListener('change',change);
 return()=>media?.removeEventListener('change',change);
});
</script>
<div class="theme-toggle" role="radiogroup" aria-label={$t('theme.aria')}>
 {#each options as option,index}
 <button type="button" role="radio" aria-checked={theme===option.value} tabindex={theme===option.value?0:-1} title={$t(`theme.${option.value}`)} onclick={()=>choose(option.value)} onkeydown={(event)=>key(event,index)}><option.icon size={15} aria-hidden="true"/><span>{$t(`theme.${option.value}`)}</span></button>
 {/each}
</div>
