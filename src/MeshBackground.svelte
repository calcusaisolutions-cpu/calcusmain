<script>
import { onMount } from 'svelte';
export let active=true;
export let cell=34;
export let radius=90;
export let className='';
let host, wake=()=>{};
$: active, wake();
const vertexShader=`uniform vec2 uMouse;uniform float uStrength;uniform float uTime;uniform float uDpr;uniform float uRadius;attribute float aSeed;varying float vGlow;
void main(){vec3 p=position;vec2 d=p.xy-uMouse;float f=exp(-dot(d,d)/(2.0*uRadius*uRadius))*uStrength;
p.xy+=normalize(d+.001)*f*uRadius*.18;p.y+=sin(p.x*.025+uTime*1.6+aSeed*6.283)*2.5*f;vGlow=f;
gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);gl_PointSize=(1.8+f*2.2)*uDpr;}`;
const lineFragment=`varying float vGlow;void main(){gl_FragColor=vec4(mix(vec3(.58,.74,.50),vec3(.36,.72,.27),vGlow),.22+vGlow*.6);}`;
const pointFragment=`varying float vGlow;void main(){if(length(gl_PointCoord-.5)>.5)discard;gl_FragColor=vec4(mix(vec3(.55,.72,.47),vec3(.30,.66,.20),vGlow),.4+vGlow*.6);}`;
onMount(()=>{
 let disposed=false,onScreen=true,visibilityObserver,renderer,scene,camera,lines,points,uniforms,resizeObserver,frame,last=0,width=0,height=0;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const mouse={x:-999,y:-999,tx:-999,ty:-999},strength={v:0,t:0};
 function build(THREE){
  lines?.geometry.dispose();points?.geometry.dispose();if(lines)scene.remove(lines,points);
  const cols=Math.ceil(width/cell)+3,rows=Math.ceil(height/cell)+3,pos=[],seed=[],edges=[];
  let s=7;const rand=()=>(s=(s*16807)%2147483647)/2147483647;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){pos.push((c-1)*cell+(rand()-.5)*cell*.7,(r-1)*cell+(rand()-.5)*cell*.7,0);seed.push(rand());}
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const i=r*cols+c;if(c<cols-1)edges.push(i,i+1);if(r<rows-1)edges.push(i,i+cols);if(c<cols-1&&r<rows-1){if(rand()<.5)edges.push(i,i+cols+1);else edges.push(i+1,i+cols);}}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geometry.setAttribute('aSeed',new THREE.Float32BufferAttribute(seed,1));
  const lineGeometry=geometry.clone();lineGeometry.setIndex(edges);
  lines=new THREE.LineSegments(lineGeometry,new THREE.ShaderMaterial({uniforms,vertexShader,fragmentShader:lineFragment,transparent:true,depthWrite:false}));
  points=new THREE.Points(geometry,new THREE.ShaderMaterial({uniforms,vertexShader,fragmentShader:pointFragment,transparent:true,depthWrite:false}));
  scene.add(lines,points);
 }
 function draw(time){
  frame=0;if(disposed||!active||!onScreen||document.hidden)return;
  if(time-last<30){frame=requestAnimationFrame(draw);return;}last=time;
  mouse.x+=(mouse.tx-mouse.x)*.18;mouse.y+=(mouse.ty-mouse.y)*.18;strength.v+=(strength.t-strength.v)*.08;
  uniforms.uMouse.value.set(mouse.x,mouse.y);uniforms.uStrength.value=strength.v;uniforms.uTime.value=time/1000;
  renderer.render(scene,camera);
  if(strength.t>0||strength.v>.002)frame=requestAnimationFrame(draw);
 }
 wake=()=>{if(renderer&&!frame&&active&&onScreen&&!document.hidden)frame=requestAnimationFrame(draw);};
 function aim(event){
  if(event.pointerType==='touch'||motion.matches||!active)return;
  const rect=host.getBoundingClientRect(),inside=event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top-30&&event.clientY<=rect.bottom+30;
  strength.t=inside?1:0;if(inside){if(strength.v<.01){mouse.x=event.clientX-rect.left;mouse.y=rect.bottom-event.clientY;}mouse.tx=event.clientX-rect.left;mouse.ty=rect.bottom-event.clientY;}
  wake();
 }
 function leave(){strength.t=0;wake();}
 async function init(){
  try{
   const THREE=await import('three');if(disposed)return;
   renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
   const dpr=Math.min(devicePixelRatio,2);renderer.setPixelRatio(dpr);host.appendChild(renderer.domElement);
   scene=new THREE.Scene();camera=new THREE.OrthographicCamera(0,1,1,0,-1,1);
   uniforms={uMouse:{value:new THREE.Vector2(-999,-999)},uStrength:{value:0},uTime:{value:0},uDpr:{value:dpr},uRadius:{value:radius}};
   resizeObserver=new ResizeObserver(()=>{const rect=host.getBoundingClientRect();if(!rect.width||(rect.width===width&&rect.height===height))return;width=rect.width;height=rect.height;renderer.setSize(width,height);camera.right=width;camera.top=height;camera.updateProjectionMatrix();build(THREE);renderer.render(scene,camera);});
   resizeObserver.observe(host);
   visibilityObserver=new IntersectionObserver(([entry])=>{onScreen=entry.isIntersecting;if(!onScreen)strength.t=strength.v=0;wake();});visibilityObserver.observe(host);
   window.addEventListener('pointermove',aim,{passive:true});document.documentElement.addEventListener('pointerleave',leave);window.addEventListener('blur',leave);document.addEventListener('visibilitychange',wake);
  }catch{renderer?.dispose();renderer=undefined;}
 }
 // Start WebGL only once the browser is idle so it never competes with the first paint.
 const idle=window.requestIdleCallback?cb=>requestIdleCallback(cb,{timeout:1500}):cb=>setTimeout(cb,600);
 idle(()=>{if(!disposed)init();});
 return()=>{disposed=true;cancelAnimationFrame(frame);resizeObserver?.disconnect();visibilityObserver?.disconnect();window.removeEventListener('pointermove',aim);document.documentElement.removeEventListener('pointerleave',leave);window.removeEventListener('blur',leave);document.removeEventListener('visibilitychange',wake);lines?.geometry.dispose();lines?.material.dispose();points?.geometry.dispose();points?.material.dispose();renderer?.dispose();renderer?.domElement.remove();};
});
</script>
<div class="mesh-background {className}" bind:this={host} aria-hidden="true"></div>
