<script lang="ts">
  import {
    File
  } from "lucide-svelte";
  import { draggableAction } from 'svelte-legos';
  import { cn } from "$lib/utils";

  export let name = 'untitled';
  export let draggable = false;
  export let href: string | null | undefined;

  const enableDrag = draggable ? draggableAction : () => {};
  console.log('$$props', $$props)

</script>

<div
  use:asDraggable
  class={cn("text-sm transition-all", $$props.class)}
>
  <a
    {href}
    class="inline-flex flex-col items-center justify-center"
    {...$$restProps}
  >
    <File size=40 />
    <span>{name}</span>
  </a>
</div>