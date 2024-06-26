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
  import { spring } from 'svelte/motion';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { browser } from '$app/environment';

  $: innerWidth = 0
  $: innerHeight = 0

  const cursor = spring({ x: innerWidth / 2 || 0, y: innerHeight / 2 || 0 }, {
		stiffness: 0.05,
		damping: 0.25,
    precision: 0.5
	});

  let innerRadius = tweened(browser && $page.url.pathname !== '/' ? window?.innerWidth : 200, {
		duration: 300,
		easing: cubicOut
	});
  let outerRadius = tweened(browser && $page.url.pathname !== '/' ? window?.innerWidth : 300, {
		duration: 300,
		easing: cubicOut
	});
  function changeRadius(inner: number = 300, outer?: number, duration = 1000) {
    innerRadius.set(inner, { duration })
    outerRadius.set(outer || inner * 2, { duration })
  }
  // mask
  const maskWidth = tweened(300, {
		duration: 300,
		easing: cubicOut
	});
  const maskHeight = tweened(200, {
		duration: 300,
		easing: cubicOut
	});
  function setMaskSize(x: number = 300, y?: number, duration = 1000) {
    maskWidth.set(x, { duration })
    maskHeight.set(y || x, { duration })
  }

  
  
  let timeout: number|undefined = undefined;
  function handleMouseMove(event?: MouseEvent & { timeout?: number, duration?: number }) {
    // console.log(event)
    
    clearTimeout(timeout)
    switch ($page.url.pathname) {
      case '/':
        if (event) {
          // focus on cursor
          const size = event?.buttons ? 50 : 100
          setMaskSize(size, size, event.duration)
          changeRadius(size, size * 2, event.duration)
          
          timeout = setTimeout(() => {
            // reset after inactivity
            setMaskSize(300, 200)
            changeRadius(300, 500)
            cursor.set({ x: innerWidth / 2, y: innerHeight / 3 }, { soft: true });
          }, event.timeout || 1200)
          cursor.set({ x: event.clientX, y: event.clientY - 100 });
        } else {
          cursor.set({ x: innerWidth / 2, y: innerHeight / 3 });
          changeRadius(300, 500)
        }
        
        break;
      case '/settings':
        // focus on top area
        cursor.set({ x: innerWidth / 2, y: innerHeight / 4 });
        setMaskSize(400, 200, 800)
        changeRadius(800, 1000)
        break;
      case '/about':
        // focus on the top left area
        cursor.set({ x: innerWidth / 3, y: innerHeight / 2.5 });
        setMaskSize(300, 200)
        changeRadius(500, 900)
        break;
      default:
        // full page content, no masking
        cursor.set({ x: innerWidth / 2, y: innerHeight / 2 });
        setMaskSize(300, 200)
        const largestEdge = Math.max(innerWidth, innerHeight)
        changeRadius(largestEdge, largestEdge + 200)
        break;
    }
  }

  onMount(() => {
    if ($page.url.pathname === '/') {
      cursor.set({ x: innerWidth / 2, y: innerHeight / 3 }); // initial positioning around hero window
    } else if (browser) {
      cursor.set({ x: innerWidth / 2, y: innerHeight / 2 });
      changeRadius(innerWidth * 4, innerWidth * 4, 0)
    }
    handleMouseMove()
    setTimeout(() => {
      // wait a bit before following cursor after page is loaded
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('dragover', handleMouseMove);
    }, 1000)
    
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
    // handleMouseMove({ clientX: innerWidth / 2, clientY: -100, timeout: 0 } as MouseEvent & { timeout: number })
  }
  $: console.log('browser', browser)
  $: {
    debugLog(`${$isCommandActive ? 'Opening' : 'Closing'} command window`)
  }
  $: isLightMode = $mode === 'light' 
  $: bgClass = isLightMode
    ? 'bg-[radial-gradient(#e5e5e5_1px,transparent_1px)]'
    : 'bg-[radial-gradient(#222222_1px,transparent_1px)]'

</script>

<ModeWatcher />
<Toaster />
<Command />

<svelte:window bind:innerWidth bind:innerHeight />

<div class="w-full h-full flex flex-col flex-grow">
  <div class="w-fixed w-full p-6 sm:px-16 print:hidden">
    <div class="sticky top-0 w-full h-full">
      <Header />
    </div>
  </div>

	<main
    class="w-full h-full max-h-screen flex-grow sm:px-16 pt-4 overflow-y-auto print:max-h-none inset-0 {bgClass} [background-size:16px_16px]"
  >
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div 
      role="region"
      on:mousedown={() => setMaskSize(50)}
      on:mouseup={() => setMaskSize(100)}
      class="absolute inset-0 top-20 pointer-events-none transition-[background-position] duration-100"
      style="--tw-bg-opacity: 0.8; background-image: radial-gradient({$maskWidth}px {$maskHeight}px at var(--x) var(--y), transparent 0%, transparent {$innerRadius}px, rgba({isLightMode ? '255, 255, 255' : '0, 0, 0'}, var(--tw-bg-opacity)) {$outerRadius}px); --x: {$cursor.x}px; --y: {$cursor.y}px;">
    </div>
    <slot />
	</main>
	<Footer />
</div>