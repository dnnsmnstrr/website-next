<script>
	import H1 from "$lib/components/typography/H1.svelte";
  import SvelteMarkdown from 'svelte-markdown'
  import imprintText from "./imprint.md?raw";
</script>

<svelte:head>
	<title>Imprint</title>
</svelte:head>

<div class="overflow-y-scroll">
  <H1>Imprint</H1>
  <SvelteMarkdown source={imprintText} renderers={{ h1: H1 }} />
</div>
