<script>
  export let depth = 1
  const levels = [
    'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6',
    'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-4 mb-2',
    'scroll-m-20 text-2xl font-semibold tracking-tight mt-3 mb-2',
    'scroll-m-20 text-xl font-semibold tracking-tight my-2'
  ]
</script>


<svelte:element this={"h" + depth} class={levels[depth - 1]}><slot /></svelte:element>