<script>
	import { page } from '$app/stores';
	import { getRedirect } from '$lib/redirect';
	import { redirects } from './api/redirect/redirects';
  import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { debugLog } from '$lib/stores/app';
  onMount(() => {
    const foundRedirect = getRedirect($page.url.pathname.replace('/', ''), redirects)
    console.log('foundRedirect', foundRedirect)
    if (foundRedirect && browser) {
      debugLog('redirecting to ' + foundRedirect)
      window.location.replace(foundRedirect)
    }
  })
</script>

<h1>{$page.status}: {$page.error.message}</h1>

<span>
  No redirect was found for: {$page.url.pathname}
</span>