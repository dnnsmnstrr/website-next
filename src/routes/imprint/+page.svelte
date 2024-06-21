<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import imprintText from "./imprint.md?raw";
	import { renderers } from "$lib/components/typography";
	import type { TypographyContext } from '$lib/components/typography';
  import * as Card from "$lib/components/ui/card";
	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import { waitForElementToDisplay } from '$lib/browser';
	import Header from '../Header.svelte';
  setContext<TypographyContext>('typography', {
    renderHeadingAnchors: true,
    externalLinks: true,
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

<div class="container overflow-y-scroll p-4 card">
  <Card.Root>
    <Card.Content class="pt-6">
      <SvelteMarkdown source={imprintText} {renderers} />
    </Card.Content>
  </Card.Root>
</div>
