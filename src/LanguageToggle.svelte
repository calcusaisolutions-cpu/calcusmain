<script>
import { lang, t } from './i18n.js';
const options=[{value:'en',label:'English'},{value:'si',label:'සිංහල'}];
function key(event,index){
 if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(event.key))return;
 event.preventDefault();
 const next=(index+1)%options.length;
 lang.set(options[next].value);
 event.currentTarget.parentElement.children[next].focus();
}
</script>
<div class="theme-toggle lang-toggle" role="radiogroup" aria-label={$t('lang.aria')}>
 {#each options as option,index}
 <button type="button" role="radio" lang={option.value} aria-checked={$lang===option.value} tabindex={$lang===option.value?0:-1} onclick={()=>lang.set(option.value)} onkeydown={(event)=>key(event,index)}>{option.label}</button>
 {/each}
</div>
