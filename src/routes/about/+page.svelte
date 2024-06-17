<script>
	import Heading from "$lib/components/typography/Heading.svelte";
	import Link from "$lib/components/typography/Link.svelte";
	import List from "$lib/components/typography/List.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { OWNER_NAME, links } from "$lib/config";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="container p-12">
  <Heading>About</Heading>

	<p>
    This is page was created by <Button href={links.cv} size="sm" variant="outline" class="ml-1 mt-2">{OWNER_NAME}</Button>
    <br>
    <br>

    It is built with <Link href="https://kit.svelte.dev" target="_blank">SvelteKit</Link>
    and <Link href="https://www.shadcn-svelte.com/" target="_blank">shadcn-svelte</Link>. Hosting is provided by <Link href="https://vercel.com/">Vercel</Link>
	</p>
  <br>
  
  <span>
    Some other the projects being used:
	</span>
  <List>
    <li><Link href="https://tailwindcss.com/">TailwindCSS</Link></li>
    <li><Link href="https://lucide.dev/icons/">Lucide Icons</Link></li>
    <li><Link href="https://svelte-legos.surge.sh/">Svelte Legos</Link></li>
    <li><Link href="https://www.npmjs.com/package/svelte-typewriter">Svelte Typewriter</Link></li>
  </List>
</div>
