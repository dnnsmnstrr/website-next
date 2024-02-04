<script>
	import '../app.pcss';
  import { ModeWatcher } from "mode-watcher";
	import Command from './Command.svelte';
	import Header from './Header.svelte';
	import './styles.css';
	import { page } from '$app/stores';
	import { isCommandActive } from '$lib/stores/app';

  $: if ($page.url.href) {
    $isCommandActive = false
  }
</script>

<ModeWatcher />
<Command />

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>