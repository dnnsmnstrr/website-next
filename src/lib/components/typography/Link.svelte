<script lang="ts">
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";
  import { ExternalLink } from "lucide-svelte";
  export let href: string
  export let target: HTMLAttributeAnchorTarget | null | undefined = undefined
  export const text: string = ''
</script>

<a
  {href}
  {target}
  class="font-medium text-primary underline underline-offset-4 inline-flex items-center gap-1 transition-opacity hover:opacity-80"
  {...$$restProps}
>
  <slot />
  {#if target === '_blank'}
    <ExternalLink size=14 />
  {/if}
</a>