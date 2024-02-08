<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import Menu from './Menu.svelte';
	import CommandButton from '$lib/components/CommandButton.svelte';
</script>

<header class="flex justify-between">
	<nav>
		<Menu />
	</nav>

  <div class="flex items-center gap-4">
    <CommandButton />
    <ModeToggle />
  </div>
</header>

