<script>
	import '../app.pcss';
  import { ModeWatcher, mode } from "mode-watcher";
	import Command from './Command.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
	import { debug, debugLog, isCommandActive } from '$lib/stores/app';

  $: if ($page.url.href) {
    $isCommandActive = false
    debugLog('Visiting new page: ' + $page.url.href)
  }
  $: console.info("Debug Mode", $debug ? "enabled" : "disabled");
  $: if ($mode) {
    debugLog('Theme was set to ' + $mode)
  }
</script>

<ModeWatcher />
<Command />

<div class="w-full h-full flex flex-col flex-nowrap py-4 flex-grow">
  <div class="w-fixed w-full flex-shrink flex-grow-0 px-16">
    <div class="sticky top-0 w-full h-full">
      <Header />
    </div>
  </div>

	<main class="w-full h-full flex-grow p-4 md:px-20 container">
		<slot />
	</main>

	<Footer />
</div>