<script>
	import H1 from "$lib/components/typography/H1.svelte";
	import Link from "$lib/components/typography/Link.svelte";
	import { OWNER_NAME } from "$lib/config";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
  <H1>About</H1>

	<p>
    This is page was created by {OWNER_NAME}.
    It is built with <Link href="https://kit.svelte.dev">SvelteKit</Link>
    and <Link href="https://www.shadcn-svelte.com/">shadcn-svelte</Link>.
	</p>
</div>
