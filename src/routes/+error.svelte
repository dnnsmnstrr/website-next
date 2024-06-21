<script>
	import { page } from '$app/stores';
	import { getRedirect } from '$lib/redirect';
	import { redirects } from '$lib/redirects';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { debugLog } from '$lib/stores/app';

  onMount(() => {
    const query = $page.url.pathname.replace('/', '')
    const foundRedirect = getRedirect(query, redirects)
    console.log('foundRedirect', foundRedirect)
    if (foundRedirect && browser) {
      debugLog('redirecting to ' + foundRedirect)
      window.location.replace(foundRedirect + '?noRedirect=true')
    }
  })
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<span>
  No redirect was found for: {$page.url.pathname}
</span>