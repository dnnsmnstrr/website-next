<script>
	import Heading from "$lib/components/typography/Heading.svelte";
	import Link from "$lib/components/typography/Link.svelte";
	import List from "$lib/components/typography/List.svelte";
	import { OWNER_NAME } from "$lib/config";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="container">
  <Heading>About</Heading>

	<p>
    This is page was created by {OWNER_NAME}.
    It is built with <Link href="https://kit.svelte.dev" target="_blank">SvelteKit</Link>
    and <Link href="https://www.shadcn-svelte.com/" target="_blank">shadcn-svelte</Link>.
	</p>
  <br>
  <span>
    Some of the projects i'm using:
	</span>
  <List>
    <li><Link href="https://lucide.dev/icons/">Lucide Icons</Link></li>
    <li><Link href="https://sveltelegos.com/">Svelte Legos</Link></li>
  </List>
</div>
