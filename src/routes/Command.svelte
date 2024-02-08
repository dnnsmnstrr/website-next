<script context="module" lang="ts">
  type CommandData = {
    name: string,
    icon?: ConstructorOfATypedSvelteComponent,
    url?: string,
    action: () => void
  }
</script>
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
	import { isCommandActive, debug, debugLog } from "$lib/stores/app";
	import Progress from "$lib/components/ui/progress/progress.svelte";
	import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";
	import { goto } from "$app/navigation";
	import { capitalize } from "$lib/helper";
	import { toggleFullscreen } from "$lib/browser";

  let loading = false;
  let lastKey = '';
  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if(e.ctrlKey || e.metaKey) e.preventDefault();
      if ($debug) {
        console.log(e)
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        $isCommandActive = !$isCommandActive;
      }
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        toggleFullscreen()
      }
      if (lastKey === 'g' && document.activeElement === document.body) {
        switch (e.key) {
          case 'h':
            goto('/')
            break;
          case 's':
            goto('/settings')
            break;
          default:
            break;
        }
      }
      if (e.key === 'Escape' && $isCommandActive) {
        $isCommandActive = false;
      }
      lastKey = e.key;
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

  const enrichLink = (link: { name: string, url: string }): CommandData => ({ ...link, action: () => {
    // loading = true
    debugLog(`Opening link to ${link.name} (${link.url})`)
    if (link.url.startsWith('/')) {
      goto(link.url)
      // window.location.href = link.url
    } else {
      window.open(link.url)
    }
  }})

  const links = [
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/dnnsmnstrr" },
  ].map(enrichLink);

  function toggleDebug() {
    $debug = !$debug
    $isCommandActive = false
  }

  $: commandConfig = {
    navigation: [
      { name: 'Home', icon: Home, url: '/' },
      { name: 'About', icon: User, url: '/about' },
      { name: 'Settings', icon: Settings, url: '/settings' },
    ].map(enrichLink),
    links,
    system: [
      { name: 'Toggle Dark Mode', icon: $mode === 'light' ? Sun : Moon, action: toggleMode },
      { name: ($debug ? 'Disable' : 'Enable') + ' Debug Mode', icon: $debug ? BugOff : Bug, action: toggleDebug },
    ]
  } as Record<string, CommandData[]>


</script>

<Command.Dialog bind:open={$isCommandActive}>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    {#each Object.entries(commandConfig) as [group, commands]}
      <Command.Group heading={capitalize(group)}>
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