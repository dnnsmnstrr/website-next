<script context="module">
  // import  DragDropTouch  from 'svelte-drag-drop-touch' // for mobile platforms
  import { asDraggable } from 'svelte-drag-and-drop-actions'
</script>

<script lang="ts">
	import WindowButtons from "./WindowButtons.svelte";
	import * as Card from '$lib/components/ui/card';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils';

  export let width = 0;
  export let height = 0;
  let DraggableWidth = 400
  let DraggableHeight = 200
  let DraggableX = 0;
  let DraggableY = 0;
  $: if (width || height) {
    if (!DraggableX) {
      DraggableX = width / 2 - DraggableWidth / 2
    }
    if (DraggableX + DraggableWidth > width) {
      DraggableWidth = width
    }
    if (!DraggableY) {
      DraggableY = height / 2 - DraggableHeight / 2
    }
    if (DraggableY + DraggableHeight > height) {
      DraggableHeight = height
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
      class="absolute block left-[{DraggableX}px] top-[{DraggableY}px] w-[{DraggableWidth}px] h-[{DraggableHeight}px]"
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
            minX:200,minY:100, maxX:width-DraggableX,maxY:height-DraggableY,
          }}
        />
      </Card.Root>
    </div>
  {/if}
</div>
