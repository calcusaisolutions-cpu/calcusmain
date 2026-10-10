// Generates the floating DiceBear "bottts" robots into public/bots. Run: npm run bots
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';
import { writeFileSync } from 'node:fs';
const bots=[['colombo','5cb944'],['ella','0289d3'],['nuwara','f29a04'],['negombo','5cb944'],['kandy','0289d3'],['anuradha','f29a04']];
for(const [seed,color] of bots){
 const name=seed[0].toUpperCase()+seed.slice(1);
 writeFileSync(new URL(`../public/bots/${seed}.svg`,import.meta.url),createAvatar(bottts,{seed:name,baseColor:[color],textureProbability:0}).toString());
}
