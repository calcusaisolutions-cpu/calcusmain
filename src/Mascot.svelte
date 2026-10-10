<script>
import { onMount } from 'svelte';
/** A point in viewport coordinates for the eyes to follow (e.g. the text caret); null hands control back to the mouse. */
export let look=null;
/** Text for the thought cloud coming from the mascot's mouth; empty hides it. */
export let cloud='';
export let alt='CalcusAi’s friendly green astronaut mascot';
let stage,canvas,applyLook=()=>{};
$: applyLook(look);
onMount(()=>{
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let target={x:0,y:0},current={x:0,y:0},frame=0,visible=true;
 function paint(){
  frame=0;if(document.hidden||!visible||reduced.matches){ctx.clearRect(0,0,canvas.width,canvas.height);return;}
  current.x+=(target.x-current.x)*.15;current.y+=(target.y-current.y)*.15;
  const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
  for(const eye of [{x:.339,y:.529},{x:.643,y:.529}]){
   const cx=w*eye.x,cy=h*eye.y;ctx.save();ctx.beginPath();ctx.ellipse(cx,cy,w*.086,h*.091,0,0,Math.PI*2);ctx.clip();
   const white=ctx.createRadialGradient(cx-w*.02,cy-h*.025,1,cx,cy,w*.105);white.addColorStop(0,'#fff');white.addColorStop(.7,'#fafbf8');white.addColorStop(1,'#c9cec5');ctx.fillStyle=white;ctx.fillRect(cx-w*.11,cy-h*.12,w*.22,h*.24);
   const x=cx+current.x*w*.018,y=cy+current.y*h*.020;
   const iris=ctx.createRadialGradient(x,y,w*.027,x,y,w*.067);iris.addColorStop(0,'#090502');iris.addColorStop(.5,'#1d0c04');iris.addColorStop(.83,'#61310d');iris.addColorStop(1,'#2b1207');ctx.fillStyle=iris;ctx.beginPath();ctx.ellipse(x,y,w*.064,h*.07,0,0,Math.PI*2);ctx.fill();
   ctx.fillStyle='#080503';ctx.beginPath();ctx.ellipse(x,y,w*.043,h*.047,0,0,Math.PI*2);ctx.fill();
   ctx.fillStyle='white';ctx.beginPath();ctx.ellipse(x-w*.026,y-h*.030,w*.015,h*.016,-.25,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x-w*.032,y+h*.009,w*.006,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  if(Math.abs(target.x-current.x)+Math.abs(target.y-current.y)>.002)frame=requestAnimationFrame(paint);
 }
 function requestPaint(){if(!frame&&visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(paint);}
 function aimAt(x,y){const r=stage.getBoundingClientRect();target={x:Math.tanh((x-r.left-r.width*.5)/(innerWidth*.3)),y:Math.tanh((y-r.top-r.height*.53)/(innerHeight*.3))};requestPaint();}
 function aim(event){if(look||event.pointerType==='touch'||reduced.matches)return;aimAt(event.clientX,event.clientY);}
 function reset(){if(look)return;target={x:0,y:0};requestPaint();}
 function leave(event){if(!event.relatedTarget)reset();}
 applyLook=point=>{if(reduced.matches)return;if(point)aimAt(point.x,point.y);else{target={x:0,y:0};requestPaint();}};
 function preference(){cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,canvas.width,canvas.height);if(!reduced.matches)requestPaint();}
 function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestPaint();}
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)requestPaint();else{cancelAnimationFrame(frame);frame=0;}});observer.observe(stage);
 window.addEventListener('pointermove',aim,{passive:true});window.addEventListener('pointerout',leave);window.addEventListener('blur',reset);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',preference);
 return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',aim);window.removeEventListener('pointerout',leave);window.removeEventListener('blur',reset);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',preference);};
});
</script>
<div class="hero-mascot" bind:this={stage}><img src="/logo.webp" {alt} fetchpriority="high" decoding="async" width="1312" height="1199"><canvas bind:this={canvas} width="1312" height="1199" aria-hidden="true"></canvas>{#if cloud}<i class="cloud-dot one" aria-hidden="true"></i><i class="cloud-dot two" aria-hidden="true"></i><i class="cloud-dot three" aria-hidden="true"></i><div class="mascot-cloud" role="status">{#key cloud}<p>{cloud}</p>{/key}</div>{/if}</div>
