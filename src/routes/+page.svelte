<script>
	import { WEBSITE_NAME } from '$lib/config';
	import { isCommandActive } from '$lib/stores/app';
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content={WEBSITE_NAME + ' Home'} />
</svelte:head>

<section class="container">
	<h1>
		dnnsmnstrr
	</h1>

	<Counter />

</section>
