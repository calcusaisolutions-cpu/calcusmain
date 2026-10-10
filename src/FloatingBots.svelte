<script>
/** Each bot: { seed (file in /public/bots), size (px), top, left (CSS lengths), delay (s), tilt (deg) }. Robots by DiceBear "bottts", generated with `npm run bots`. */
export let bots=[];
</script>
<div class="bots" aria-hidden="true">
 {#each bots as bot}<img src="/bots/{bot.seed}.svg" alt="" width={bot.size} height={bot.size} loading="lazy" style="top:{bot.top};left:{bot.left};--delay:{bot.delay}s;--tilt:{bot.tilt}deg">{/each}
</div>
