<script>
// Floating "Contact Now" button: one tap calls Calcus AI.
import { Phone } from '@lucide/svelte';
import { t } from './i18n.js';
import { COMPANY } from './data/services.js';
</script>
<a class="call-fab" href="tel:{COMPANY.phone}" aria-label="{$t('call.label')} {COMPANY.phoneDisplay}">
 <span class="call-fab-icon"><Phone size={20} aria-hidden="true"/></span>
 <span class="call-fab-text">{$t('call.label')}</span>
</a>
