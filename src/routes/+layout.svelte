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
  $: debugLog("Debug Mode", $debug ? "enabled" : "disabled");
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

<div class="w-full h-full flex flex-col flex-grow">
  <div class="w-fixed w-full py-4 px-16 print:hidden">
    <div class="sticky top-0 w-full h-full">
      <Header />
    </div>
  </div>

	<main class="w-full h-full max-h-screen flex-grow p-2 sm:px-16 overflow-y-auto print:max-h-none">
    <slot />
	</main>

	<Footer />
</div>