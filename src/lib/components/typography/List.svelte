<script lang="ts">
	import { cn } from "$lib/utils";

  export let ordered = false
</script>

<svelte:element
  this={ordered ? 'ol' : 'ul'}
  {...$$restProps}
  class={cn("my-6 ml-6 {ordered ? 'list-decimal' : 'list-disc'} [&>li]:mt-2", $$props.class)}
>
  <slot />
</svelte:element>