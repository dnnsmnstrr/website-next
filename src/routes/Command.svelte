<script lang="ts">
  import {
    Home,
    User,
    Settings,
    Bug,
    BugOff,
    Sun,
    Moon,
    Instagram,
  } from "lucide-svelte";
  import * as Command from "$lib/components/ui/command";
  import { mode, toggleMode } from 'mode-watcher';
  import { onMount } from "svelte";
	import { isCommandActive, debug } from "$lib/stores/app";
	import Progress from "$lib/components/ui/progress/progress.svelte";
	import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";

  let open = false;
  $: open = $isCommandActive
  let loading = false;
  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ($debug) {
        console.log(e)
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        $isCommandActive = !$isCommandActive;
      }
      if (e.key === 'Escape' && $isCommandActive) {
        $isCommandActive = false;
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  const loadingProgress = tweened(0, {
    duration: 1000,
    easing: cubicInOut
  });

  $: $loadingProgress = loading ? 100 : 0;

  const links = [
    { name: 'About', icon: User, url: '/about' },
    { name: 'Home', icon: Home, url: '/' },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/dnnsmnstrr" },
  ].map(link => ({ ...link, action: () => {
    loading = true
    if (link.url.startsWith('/')) {
      window.location.href = link.url
    } else {
      window.open(link.url)
    }
  }}));

  function toggleDebug() {
    $debug = !$debug
    console.info("Debug Mode", $debug ? "enabled" : "disabled");
    $isCommandActive = false
  }
  const commandConfig = {
    navigation: [
    ],
    links,
    system: [
      { name: 'Toggle Dark Mode', icon: $mode === 'light' ? Sun : Moon, action: toggleMode },
      { name: ($debug ? 'Disable' : 'Enable') + ' Debug Mode', icon: $debug ? BugOff : Bug, action: toggleDebug }
    ]
  }
</script>

<Command.Dialog bind:open>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    {#each Object.entries(commandConfig) as [group, commands]}
      <Command.Group heading={group}>
        {#each commands as command}
        <Command.Item onSelect={command.action}>
            {#if command.icon}
              <svelte:component this={command.icon} class="mr-2"/>
            {/if}
            {command.name}
        </Command.Item>
        {/each}
      </Command.Group>
    {/each}
  </Command.List>
  <Command.Loading class="h-1">
    {#if loading}
      <Progress value={$loadingProgress} class="h-1"/>
    {/if}
  </Command.Loading>
</Command.Dialog>