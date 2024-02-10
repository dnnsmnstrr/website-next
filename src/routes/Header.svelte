<script>
  import {
    Globe
  } from "lucide-svelte";
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import BatteryIndicator from '$lib/components/BatteryIndicator.svelte';
	import Menu from './Menu.svelte';
	import CommandButton from '$lib/components/CommandButton.svelte';
</script>

<header class="flex justify-between">
	<nav class="flex items-center">
    <a href="/">
      <Globe size=20 />
    </a>
		<Menu />
	</nav>

  <div class="flex items-center gap-4">
    <BatteryIndicator />
    <CommandButton />
    <ModeToggle />
  </div>
</header>

