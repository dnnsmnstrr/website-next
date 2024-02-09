<script>
  import { isCommandActive } from '$lib/stores/app';
  import { Button } from "$lib/components/ui/button";
  import {
    Search
  } from "lucide-svelte";
</script>

<p class="text-sm ">
  <Button variant="outline" on:click={() => $isCommandActive = !$isCommandActive} class="flex items-center gap-2">
    <Search />
    <kbd
      class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
    >
      <span class="text-xs">⌘</span>K
    </kbd>
  </Button>
</p>