<script context="module">
  import 'dragdroptouch-bug-fixed' // for mobile platforms
  import { asDraggable } from 'svelte-drag-and-drop-actions'
</script>

<script lang="ts">
	import WindowButtons from "./WindowButtons.svelte";
	import * as Card from '$lib/components/ui/card';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import { filePosition } from '$lib/stores/desktop';

  const minHeight = 250;
  const minWidth = 200;
  const fileSize = 50;
  const padding = 20;
  export let width = 0;
  export let height = 0;
  let DraggableWidth = 350
  let DraggableHeight = minHeight
  let DraggableX = 0;
  let DraggableY = 0;

  $: if (width || height) {
    if (!DraggableX) {
      DraggableX = width / 2 - DraggableWidth / 2
    }
    if ((DraggableX + DraggableWidth) > width) {
      if (width - DraggableX > minWidth) {
        DraggableWidth = width - DraggableX
      } else if (width - DraggableWidth - padding > padding) {
        DraggableX = width - DraggableWidth - padding
      }
    }
    if (!DraggableY) {
      DraggableY = height / 3 - DraggableHeight / 2
    }
    if (DraggableY + DraggableHeight > height) {
      DraggableHeight = height - DraggableHeight
    }

    //file
    if (width < ($filePosition.x + fileSize)) {
      $filePosition.x = width - (fileSize + 20)
    }
  }
  function handleDragChange (x: number, y: number) {
    if (x) {
      DraggableX = x;
    }
    if (y) {
      DraggableY = y;
    }
  }

  function handleFileChange (x: number, y: number) {
    if (x) {
      $filePosition.x = x;
    }
    if (y) {
      $filePosition.y = y;
    }
  }

  function startResizing () { return { x:DraggableWidth,y:DraggableHeight } }
  function continueResizing (x: number,y: number) {
    DraggableWidth = x;
    DraggableHeight = y;
  }
  function finishResizing (x: number, y: number)   { DraggableWidth = x; DraggableHeight = y }
</script>

<div class="relative block"
style="width:{width}px; height:{height}px;">
  {#if width && height}
    <div
      transition:fade
      class="absolute block left-[{DraggableX}px] top-[{DraggableY}px] w-[{DraggableWidth}px] h-[{DraggableHeight}px] z-30"
      style="left:{DraggableX}px; top:{DraggableY}px; width:{DraggableWidth}px; height:{DraggableHeight}px;"
      use:asDraggable={{
        minX:0,minY:0, maxX:width-DraggableWidth,maxY:height-DraggableHeight,
        onDragStart:{x:DraggableX,y:DraggableY}, onDragMove: handleDragChange, onDragEnd: handleDragChange
      }}
    >
      <Card.Root class="block h-full w-full">
        <div class="block absolute left-0 top-0 w-full h-6 cursor-grab">
          <WindowButtons />
        </div>
        <div class={cn("flex items-center justify-center h-full", $$props.class)}>
          <slot />
        </div>
        <div
          class="block absolute right-0 bottom-0 w-8 h-8 cursor-nwse-resize"
          use:asDraggable={{
            onDragStart:startResizing, onDragMove:continueResizing, onDragEnd:finishResizing,
            minX:minWidth,minY:minHeight, maxX:width-DraggableX,maxY:height-DraggableY,
          }}
        />
      </Card.Root>
    </div>
  {/if}
  {#if $$slots.file && ($filePosition.x || $filePosition.y)}
		<div
      transition:fade
      class="block absolute right-0 bottom-0 w-8 h-8 cursor-move z-10"
      style="left:{$filePosition.x}px; top:{$filePosition.y}px; width:{fileSize}px; height:{fileSize}px;"
      use:asDraggable={{
        minX:0,minY:0, maxX:width-fileSize,maxY:height-fileSize,
        onDragStart:{x:$filePosition.x,y:$filePosition.y}, onDragMove: handleFileChange, onDragEnd: handleFileChange
      }}
    >
      <slot name="file" />
    </div>
	{/if}
</div>
