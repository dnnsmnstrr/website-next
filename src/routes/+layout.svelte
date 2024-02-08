<script>
	import '../app.pcss';
  import { ModeWatcher } from "mode-watcher";
	import Command from './Command.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
	import { isCommandActive } from '$lib/stores/app';

  $: if ($page.url.href) {
    $isCommandActive = false
  }
</script>

<ModeWatcher />
<Command />

<div class="w-full h-full flex flex-col flex-nowrap py-4 flex-grow">
  <div class="w-fixed w-full flex-shrink flex-grow-0 px-4">
    <div class="sticky top-0 p-4 w-full h-full">
      <Header />
    </div>
  </div>

	<main class="w-full h-full flex-grow p-4">
		<slot />
	</main>

	<Footer />
</div>