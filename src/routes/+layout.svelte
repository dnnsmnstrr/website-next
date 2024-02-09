<script>
	import '../app.pcss';
  import { ModeWatcher, mode } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
	import Command from './Command.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
	import { debug, debugLog, isCommandActive, resetColors } from '$lib/stores/app';

  $: if ($page.url.href) {
    $isCommandActive = false
    debugLog('Visiting new page: ' + $page.url.href)
  }
  $: console.info("Debug Mode", $debug ? "enabled" : "disabled");
  $: if ($mode) {
    debugLog('Theme was set to ' + $mode);
    resetColors();
  }
  $: {
    debugLog(`${$isCommandActive ? 'Opening' : 'Closing'} command window`)
  }
</script>

<ModeWatcher />
<Toaster />
<Command />

<div class="w-full h-full flex flex-col flex-nowrap flex-grow">
  <div class="w-fixed w-full flex-shrink flex-grow-0 py-4 px-16">
    <div class="sticky top-0 w-full h-full">
      <Header />
    </div>
  </div>

	<main class="w-full h-full max-h-screen flex-grow p-4 md:px-16 overflow-y-auto">
    <div class="container">
      <slot />
    </div>
	</main>

	<Footer />
</div>