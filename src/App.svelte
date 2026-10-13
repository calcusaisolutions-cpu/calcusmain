<script>
// Site layout. `url` is the page path: the pre-render step passes each route, the browser passes location.pathname.
import NavBar from './NavBar.svelte';
import Footer from './Footer.svelte';
import Home from './pages/Home.svelte';
import ServicesIndex from './pages/ServicesIndex.svelte';
import ServicePage from './pages/ServicePage.svelte';
import ForTeachers from './pages/ForTeachers.svelte';
import Packages from './pages/Packages.svelte';
import NotFound from './pages/NotFound.svelte';
import CallButton from './CallButton.svelte';
import { resolve } from './routes.js';
export let url='/';
$: route=resolve(url);
</script>
<a class="skip-link" href="#main">Skip to content</a>
<NavBar page={route.page}/>
<main id="main">
 {#if route.page==='home'}<Home/>
 {:else if route.page==='services'}<ServicesIndex/>
 {:else if route.page==='service'}<ServicePage service={route.service}/>
 {:else if route.page==='teachers'}<ForTeachers/>
 {:else if route.page==='packages'}<Packages/>
 {:else}<NotFound/>{/if}
</main>
<Footer/>
<CallButton/>
