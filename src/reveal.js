// Svelte action: fades an element up the first time it scrolls into view.
// Usage: <div use:reveal> or <div use:reveal={120}> for a delay in milliseconds.
let observer;
function shared(){
 observer??=new IntersectionObserver(entries=>{
  for(const entry of entries){
   // Also reveal anything already above the viewport (e.g. when the page opens at #contact).
   if(!entry.isIntersecting&&entry.boundingClientRect.top>=0)continue;
   entry.target.classList.add('revealed');
   observer.unobserve(entry.target);
  }
 },{rootMargin:'0px 0px -8% 0px',threshold:.12});
 return observer;
}
export function reveal(node,delay=0){
 if(typeof IntersectionObserver!=='function')return;
 node.classList.add('reveal');
 node.style.setProperty('--reveal-delay',`${delay}ms`);
 shared().observe(node);
 return{destroy(){observer?.unobserve(node);}};
}
