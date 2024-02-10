<script context="module" lang="ts">
  type CommandData = {
    name: string,
    icon?: ConstructorOfATypedSvelteComponent,
    url?: string,
    action?: () => void
  }
</script>
<script lang="ts">
  import {
    Home,
    User,
    Settings,
    Bug,
    BugOff,
    PartyPopper,
    Pipette,
    Sun,
    Moon,
    Instagram,
	Palette,
	ArrowRight,
	ArrowLeft,
	Music,
	Send,
	Linkedin,
	Twitter,
	Shapes,
  } from "lucide-svelte";
  import * as Command from "$lib/components/ui/command";
  import { mode, toggleMode } from 'mode-watcher';
  import { onMount } from "svelte";
	import { isCommandActive, debug, debugLog, primaryColor, backgroundColor, resetColors } from "$lib/stores/app";
	import Progress from "$lib/components/ui/progress/progress.svelte";
	import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";
	import { goto } from "$app/navigation";
	import { capitalize, hexToHsl } from "$lib/helper";
	import { reloadPage, toggleFullscreen } from "$lib/browser";
  import { confettiAction, eyeDropperAction } from "svelte-legos";
  import { toast } from "svelte-sonner";

  let loading = false;
  let lastKey = '';
  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if(e.key !== 'Dead' && (e.ctrlKey || e.metaKey)) e.preventDefault();
      if ($debug) {
        console.log(e)
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        $isCommandActive = !$isCommandActive;
      }
      if (e.key === "r" && (e.metaKey || e.ctrlKey)) {
        reloadPage();
      }
      if (e.key === "?" && e.shiftKey) {
        goto('/help')
      }
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        toggleFullscreen()
      }
      const noFocusedElement = document.activeElement === document.body
      if (lastKey === 'g' && noFocusedElement) {
        switch (e.key) {
          case 'a':
            goto('/about')
            break;
          case 'i':
            goto('/imprint')
            break;
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
      if (lastKey === 'd' && e.key === "m" && noFocusedElement) {
        toggleMode()
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

  const enrichLink = (link: CommandData): CommandData => {
    const action = link.action || function() {
      if (!link.url) {
        return debugLog("Cannot open link for " + link.name);
      }
      debugLog(`Opening link to ${link.name} (${link.url})`)
      if (link.url.startsWith('/')) {
        goto(link.url)
        // window.location.href = link.url
      } else {
        window.open(link.url)
      }
    };
    return {
      ...link,
      action
    }
  }

  const links: CommandData[] = [
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/dnnsmnstrr" },
    { name: "Spotify", icon: Music, url: "https://open.spotify.com/user/dennismuensterer" },
    { name: "Telegram", icon: Send, url: "https://t.me/dnnsmnstrr" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/dennismuensterer" },
    { name: "Twitter/X", icon: Twitter, url: "https://twitter.com/dnnsmnstrr" },
  ].map(enrichLink);

  function toggleDebug() {
    $debug = !$debug
    $isCommandActive = false
  }

  $: commandConfig = {
    navigation: [
      { name: 'Home', icon: Home, url: '/' },
      { name: 'About', icon: User, url: '/about' },
      { name: 'Playground', icon: Shapes, url: '/playground' },
      { name: 'Settings', icon: Settings, url: '/settings' },
      { name: 'Go Forward', icon: ArrowRight, action: () => window.history.forward() },
      { name: 'Go Back', icon: ArrowLeft, action: () => window.history.back() },
      { name: 'Reload', icon: ArrowLeft, action: reloadPage },
    ].map(enrichLink),
    links,
    system: [
      { name: 'Toggle Dark Mode', icon: $mode === 'light' ? Sun : Moon, action: toggleMode },
      { name: ($debug ? 'Disable' : 'Enable') + ' Debug Mode', icon: $debug ? BugOff : Bug, action: toggleDebug },
      { name: 'Reset theme colors', icon: Palette, action: resetColors },
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
              <svelte:component this={command.icon} class="mr-2" />
            {/if}
            {command.name}
        </Command.Item>
        {/each}
      </Command.Group>
    {/each}
    <Command.Group heading="Settings">
      <button use:eyeDropperAction={{
        onDone: (color) => {
          const message = "Picked color: " + color
          debugLog(message)
          $primaryColor = hexToHsl(color)
          toast.success(message, {
            description: "Click to copy to clipboard",
            action: {
              label: "Copy",
              onClick: () => navigator.clipboard.writeText(color)
            }
          })
        },
        onError: console.error
      }} class="w-full">
        <Command.Item>
          <Pipette class="mr-2" />
          Pick primary color
        </Command.Item>
      </button>
      <button use:eyeDropperAction={{
        onDone: (color) => {
          const message = "Picked color: " + color
          debugLog(message)
          $backgroundColor = hexToHsl(color)
          toast.success(message, {
            description: "Click to copy to clipboard",
            action: {
              label: "Copy",
              onClick: () => navigator.clipboard.writeText(color)
            }
          })
        },
        onError: console.error
      }} class="w-full">
        <Command.Item>
          <Pipette class="mr-2" />
          Pick background color
        </Command.Item>
      </button>
    </Command.Group>
    <Command.Group heading="Fun">
      <button use:confettiAction class="w-full">
        <Command.Item>
          <PartyPopper class="mr-2" />
          Confetti
        </Command.Item>
      </button>
    </Command.Group>
  </Command.List>
  <Command.Loading class="h-1">
    {#if loading}
      <Progress value={$loadingProgress} class="h-1"/>
    {/if}
  </Command.Loading>
</Command.Dialog>