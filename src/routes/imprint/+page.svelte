<script>
  import SvelteMarkdown from 'svelte-markdown'
  import imprintText from "./imprint.md?raw";
	import Heading from "$lib/components/typography/Heading.svelte";
	import Link from "$lib/components/typography/Link.svelte";
	import List from '$lib/components/typography/List.svelte';
</script>

<svelte:head>
	<title>Imprint</title>
</svelte:head>

<div class="container overflow-y-scroll">
  <SvelteMarkdown source={imprintText} renderers={{
    heading: Heading,
    link: Link,
    list: List
  }} />
</div>
