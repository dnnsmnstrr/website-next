<script lang="ts">
  export let ordered = false
</script>

<svelte:element
  this={ordered ? 'ol' : 'ul'}
  class="my-6 ml-6 {ordered ? 'list-decimal' : 'list-disc'} [&>li]:mt-2"
>
  <slot />
</svelte:element>