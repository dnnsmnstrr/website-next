<script>
	import { WEBSITE_NAME } from '$lib/config';
	import { isCommandActive } from '$lib/stores/app';
	import { draggableAction } from 'svelte-legos';
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content={WEBSITE_NAME + ' Desktop'} />
</svelte:head>

<section class="container h-full">
	<h1>
		dnnsmnstrr
	</h1>
  <Counter />

  <div use:draggableAction>
    <a href="/about">about.txt</a>
  </div>

</section>
