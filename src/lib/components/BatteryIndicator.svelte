<script lang="ts">
	import { debugLog } from "$lib/stores/app";
  import {
    BatteryLow,
    BatteryMedium,
    BatteryFull,
    BatteryCharging,
  } from "lucide-svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
	import { battery } from "svelte-legos";
  const batteryInfo = battery();
  $: (
    {
      charging,
      level
    } = $batteryInfo
  )
  debugLog('Battery Info:', $batteryInfo)
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    {#if charging}
      <BatteryCharging />
    {:else if level < 0.2}
      <BatteryLow />
    {:else if level < 0.6}
      <BatteryMedium />
    {:else}
      <BatteryFull />
    {/if}
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>{level * 100}%</p>
  </Tooltip.Content>
</Tooltip.Root>