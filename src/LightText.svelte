<script>
// A statement whose words light up one by one as it scrolls through the screen.
// Wrap words in *asterisks* to light them up in brand green. Without JavaScript (and with reduced motion) it simply shows fully lit.
import { onMount } from 'svelte';
export let text='';
export let label='';
let host,ready=false,progress=1;
$: words=text.split(/\s+/).filter(Boolean).map(word=>{const accent=/^\*.*\*[.,:;!?—]*$/.test(word);return {text:accent?word.replace(/\*/g,''):word,accent};});
$: lit=index=>Math.max(0,Math.min(1,progress*(words.length+2)-index));
onMount(()=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let frame=0,listening=false;
 const update=()=>{
  frame=0;
  const rect=host.getBoundingClientRect(),view=innerHeight;
  // Starts lighting when the text enters the lower part of the screen, finishes as it passes the upper middle.
  progress=Math.max(0,Math.min(1,(view*.85-rect.top)/(rect.height+view*.4)));
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 const observer=new IntersectionObserver(([entry])=>{
  if(entry.isIntersecting&&!listening){addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});listening=true;}
  else if(!entry.isIntersecting&&listening){removeEventListener('scroll',schedule);removeEventListener('resize',schedule);listening=false;}
  schedule();
 },{rootMargin:'20% 0px'});
 update();ready=true;observer.observe(host);
 return()=>{observer.disconnect();cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);};
});
</script>
<div class="light-text" class:ready bind:this={host}>
 {#if label}<p class="kicker">{label}</p>{/if}
 <p class="light-text-body">{#each words as word,index}<span class:accent={word.accent} style="--lit:{ready?lit(index):1}">{word.text}</span>{' '}{/each}</p>
</div>
