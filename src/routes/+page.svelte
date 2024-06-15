<script lang="ts">
	import { WEBSITE_NAME } from '$lib/config';
	import File from '$lib/components/File.svelte';
	import DraggableWindow from '$lib/components/DraggableWindow.svelte';
  import { elementBoundingStore } from 'svelte-legos';
	import Profile from '$lib/components/Profile.svelte';
	import { onMount } from 'svelte';
	import { filePosition, initializeFile } from '$lib/stores/desktop';

  let element: HTMLElement | null = null;
  let rect = null;
  $: element && (rect = elementBoundingStore(element));
  $: ({ width, height } = $rect || { width: 0, height: 0 });

  onMount(() => {
    if (!$filePosition.x && !$filePosition.y) {
      initializeFile()
    }
  })
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content={WEBSITE_NAME + ' Desktop'} />
</svelte:head>

<section class="w-full h-full" bind:this={element}>
  <DraggableWindow {width} {height} class="flex justify-center items-center">
    <Profile />
    <File name='test.txt' href='/playground' slot="file" />
  </DraggableWindow>
</section>