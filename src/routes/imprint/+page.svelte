<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import imprintText from "./imprint.md?raw";
	import { renderers } from "$lib/components/typography";
	import type { TypographyContext } from '$lib/components/typography';
	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import { waitForElementToDisplay } from '$lib/browser';
  setContext<TypographyContext>('typography', {
    renderHeadingAnchors: true,
  })
  $: if ($page.url.hash) {
    const anchorId = $page.url.hash
    waitForElementToDisplay(anchorId, (anchor) => {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }
</script>

<svelte:head>
	<title>Imprint</title>
</svelte:head>

<div class="container overflow-y-scroll pb-8">
  <SvelteMarkdown source={imprintText} {renderers} />
</div>
