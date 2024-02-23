<script lang="ts">
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";
  import { ExternalLink } from "lucide-svelte";
  import { getContext } from "svelte";
	import type { TypographyContext } from ".";
  const typography = getContext<TypographyContext>('typography')

  export let href: string | undefined
  export let target: HTMLAttributeAnchorTarget | null | undefined = undefined
  export const text: string = ''
  if (typography?.externalLinks) {
    target = '_blank'
  }
</script>

<a
  {href}
  {target}
  class="font-medium text-primary underline underline-offset-4 inline-flex items-center gap-1 transition-opacity hover:opacity-80"
  {...$$restProps}
>
  <slot />
  {#if target === '_blank' && !typography?.externalLinks}
    <ExternalLink size=14 />
  {/if}
</a>