<script>
import { ArrowRight } from '@lucide/svelte';
import Seo from '../Seo.svelte';
import { t, lang } from '../i18n.js';
import { services, serviceUrl } from '../data/services.js';
const popular=['ai-chatbots-voice-assistants','website-design-development','business-management-systems','ecommerce-online-selling','mobile-app-development','learning-management-systems'].map(slug=>services.find(service=>service.slug===slug));
</script>
<Seo title={$t('nf.meta')} description={$t('nf.text')} path="/404/" noindex/>
<section class="section page-head not-found">
 <img src="/bots/ella.svg" alt="" width="140" height="140">
 <h1 class="page-title">{$t('nf.title')}</h1>
 <p class="lede">{$t('nf.text')}</p>
 <div class="section-actions"><a class="button" href="/">{$t('nf.home')}</a><a class="button button-soft" href="/services/">{$t('dir.all')}</a></div>
 <div class="package-links">{#each popular as service}<a href={serviceUrl(service)}>{$lang==='si'?service.siTitle:service.title} <ArrowRight size={14} aria-hidden="true"/></a>{/each}</div>
</section>
