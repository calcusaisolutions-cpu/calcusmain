// Every page on the site. The pre-render step writes one HTML file per path, and the sitemap lists them.
import { services, serviceUrl, serviceBySlug } from './data/services.js';

export const routes = ['/', '/services/', '/packages/', ...services.map(serviceUrl)];

export function resolve(path){
 const clean=('/'+path.replace(/^\/+|\/+$/g,'')+'/').replace(/^\/\/$/,'/');
 if(clean==='/')return {page:'home'};
 if(clean==='/services/')return {page:'services'};
 if(clean==='/packages/')return {page:'packages'};
 const match=clean.match(/^\/services\/([a-z0-9-]+)\/$/);
 if(match&&serviceBySlug[match[1]])return {page:'service',service:serviceBySlug[match[1]]};
 return {page:'notfound'};
}
