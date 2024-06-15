<script lang="ts">
	import '../app.pcss';
  import { ModeWatcher, mode } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
	import Command from './Command.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
	import { debug, debugLog, isCommandActive, resetColors } from '$lib/stores/app';
	import { onMount } from 'svelte';

  let cursorX = '50%';
  let cursorY = '40%';
  let innerRadius = 300;
  let outerRadius = 500;

  function handleMouseMove(event?: MouseEvent) {
    switch ($page.url.pathname) {
      case '/':
        if (event) {
          cursorX = `${event?.clientX}px`;
          cursorY = `${event?.clientY-100}px`;
        } else {
          cursorX = '50%';
          cursorY = '40%';
        }
        innerRadius = 300;
        outerRadius = 500;
        break;
      case '/about':
        cursorX = '30%';
        cursorY = '40%';
        innerRadius = 600;
        outerRadius = 700;
        break;
      default:
        cursorX = '50%';
        cursorY = '50%';
        innerRadius = 1000;
        outerRadius = 1200;
        break;
    }
  }

  onMount(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('dragover', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('dragover', handleMouseMove);
    };
  });

  $: if ($page.url.href) {
    $isCommandActive = false
    debugLog('Visiting new page: ' + $page.url.href)
    handleMouseMove()
  }
  $: debugLog("Debug Mode", $debug ? "enabled" : "disabled");
  $: if ($mode) {
    document.documentElement.setAttribute("data-theme", $mode)
    debugLog('Theme was set to ' + $mode);
    resetColors();
  }
  $: {
    debugLog(`${$isCommandActive ? 'Opening' : 'Closing'} command window`)
  }
  $: isLightMode = $mode === 'light' 
  $: bgClass = isLightMode
    ? 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]'
    : 'bg-[radial-gradient(#222222_1px,transparent_1px)]'

</script>

<ModeWatcher />
<Toaster />
<Command />

<div class="w-full h-full flex flex-col flex-grow">
  <div class="w-fixed w-full p-6 sm:px-16 print:hidden">
    <div class="sticky top-0 w-full h-full">
      <Header />
    </div>
  </div>

	<main class="w-full h-full max-h-screen flex-grow sm:px-16 overflow-y-auto print:max-h-none inset-0 {bgClass} [background-size:16px_16px]">
    <div 
      class="absolute inset-0 top-20 pointer-events-none transition-[background-position] duration-100"
      style="--tw-bg-opacity: 0.8; background-image: radial-gradient(circle at var(--x) var(--y), transparent 0%, transparent {innerRadius}px, rgba({isLightMode ? '255, 255, 255' : '0, 0, 0'}, var(--tw-bg-opacity)) {outerRadius}px); --x: {cursorX}; --y: {cursorY};">
    </div>
    <slot />
	</main>
	<Footer />
</div>