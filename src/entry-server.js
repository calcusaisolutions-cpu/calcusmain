// Used only at build time by scripts/prerender.mjs to turn each route into static HTML.
import { render } from 'svelte/server';
import App from './App.svelte';
export { routes } from './routes.js';
export { categories, services, packages, why, delivery, vision, customers, provinces, serviceUrl, SITE_URL, COMPANY, COMPANY_ADDRESS } from './data/services.js';
export function renderPage(url){
 return render(App,{props:{url}});
}
