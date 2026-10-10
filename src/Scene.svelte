<script>
import { onMount } from 'svelte';
let host;
onMount(() => {
 let disposed=false, renderer, geometry, material, observer, frame, resize, visibility, motionChange;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=true;
 async function init(){
  if(motion.matches) return;
  try {
   const THREE=await import('three'); if(disposed) return;
   renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
   renderer.setPixelRatio(Math.min(devicePixelRatio, navigator.hardwareConcurrency <= 4 ? 1 : 1.5));
   host.appendChild(renderer.domElement);
   const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(40,1,.1,100); camera.position.z=7;
   geometry=new THREE.TorusGeometry(2.15,.025,8,96);
   material=new THREE.MeshStandardMaterial({color:0x76cf15,metalness:.25,roughness:.45});
   const mesh=new THREE.Mesh(geometry,material); scene.add(mesh);
   scene.add(new THREE.AmbientLight(0xffffff,2)); const light=new THREE.PointLight(0xb6ff63,40); light.position.set(3,3,4);scene.add(light);
   resize=()=>{const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};
   resize(); window.addEventListener('resize',resize);
   let last=0,slow=0;
   const draw=(time)=>{frame=undefined;if(disposed||!visible||document.hidden||motion.matches)return;if(time-last>=33){if(last&&time-last>65)slow++;if(slow>45){renderer.setPixelRatio(.8);resize();slow=0;}last=time;mesh.rotation.z=time*.00012;mesh.rotation.x=1.15+Math.sin(time*.00012)*.12;renderer.render(scene,camera);}frame=requestAnimationFrame(draw);};
   const resume=()=>{if(!frame&&!disposed&&visible&&!document.hidden&&!motion.matches)frame=requestAnimationFrame(draw);};
   observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume();});observer.observe(host);
   visibility=resume;document.addEventListener('visibilitychange',visibility);
   motionChange=()=>{renderer.domElement.style.display=motion.matches?'none':'block';resume();};motion.addEventListener('change',motionChange);
   resume();
  }catch{renderer?.dispose();}
 }
 init();
 return ()=>{disposed=true;cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',motionChange);geometry?.dispose();material?.dispose();renderer?.dispose();renderer?.domElement.remove();};
});
</script>
<div class="scene" bind:this={host} aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div></div>
