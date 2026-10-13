<script>
// Site-wide footer: a full directory of every service, so each page is reachable from everywhere.
import ThemeToggle from './ThemeToggle.svelte';
import LanguageToggle from './LanguageToggle.svelte';
import { t, lang } from './i18n.js';
import { categories, serviceUrl, COMPANY, COMPANY_MAP } from './data/services.js';
</script>
<footer>
 <!-- The mascot sits on the footer's top edge; in dark mode it shines a torch across the footer. -->
 <div class="footer-mascot" aria-hidden="true">
  <img src="/logo-medium.webp" alt="" width="512" height="468" loading="lazy" decoding="async">
  <span class="torch-rig"><span class="torch-beam"></span><span class="torch"></span></span>
 </div>
 <div class="footer-inner">
  <div class="footer-brand">
   <a class="brand" href="/"><img src="/logo-small.webp" alt="" width="48" height="44"><span class="wordmark">Calcus<span>Ai</span></span></a>
   <p>{$t('footer.blurb')}</p>
   <address class="footer-address"><strong>{COMPANY.office}</strong><a href={COMPANY_MAP} rel="noopener" target="_blank">{COMPANY.street}<br>{COMPANY.locality}, {COMPANY.country}</a><a class="footer-phone" href="tel:{COMPANY.phone}">{COMPANY.phoneDisplay}</a></address>
   <div class="footer-explore">
    <h4>{$t('footer.explore')}</h4>
    <a href="/">{$t('footer.home')}</a><a href="/services/">{$t('footer.allServices')}</a><a href="/packages/">{$t('nav.packages')}</a><a href="/packages/for-teachers/">{$t('footer.teachers')}</a><a href="/#approach">{$t('nav.approach')}</a><a href="/#contact">{$t('nav.contact')}</a>
   </div>
  </div>
  <nav class="footer-directory" aria-label={$t('footer.allServices')}>
   {#each categories as category}
   <div><h4><a href="/services/#{category.slug}">{$lang==='si'?category.si:category.name}</a></h4>{#each category.services as service}<a href={serviceUrl(service)}>{$lang==='si'?service.siTitle:service.title}</a>{/each}</div>
   {/each}
  </nav>
 </div>
 <div class="footer-bottom"><span>© {new Date().getFullYear()} {COMPANY.legalName} · {$t('footer.tagline')} · {$t('contact.location')}</span><div class="footer-toggles"><LanguageToggle/><ThemeToggle/></div></div>
</footer>
