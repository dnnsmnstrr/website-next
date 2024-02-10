<script context="module" lang="ts">
  type CommandData = {
    name: string,
    value?: string,
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
	Keyboard,
	ScrollText,
  } from "lucide-svelte";
  import * as Command from "$lib/components/ui/command";
  import * as Dialog from "$lib/components/ui/dialog";
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
	import List from "$lib/components/typography/List.svelte";
	import Kbd from "$lib/components/typography/Kbd.svelte";
	import { page } from "$app/stores";

  let loading = false;
  let showHelp = false;
  let lastKey = '';

  const shortcuts = [
    { key: '?', description: 'Open this help dialog' },
    { key: 'esc', description: 'Close open dialog'},
    { key: ['⌘', ','], description: 'Go to settings'},
    { key: ['⌘', 'F'], description: 'Fullscreen'},
    { key: ['⌘', 'P'], description: 'Print'},
  ]
  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      const ignoredKeys = ['Dead', 'Backspace']
      if(!ignoredKeys.includes(e.key) && (e.ctrlKey || e.metaKey)) e.preventDefault();
      if ($debug) {
        console.log(e)
      }
      // meta
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case ',':
            goto('/settings')
            break;
          case 'f':
            toggleFullscreen()
            break;
          case 'k':
            $isCommandActive = !$isCommandActive;
            break;
          case 'r':
            reloadPage();
            break
          default:
            break;
        }
      }

      // shortcuts
      const noFocusedElement = document.activeElement === document.body
      if (e.shiftKey && noFocusedElement) {
        switch (e.key) {
          case '?':
            showHelp = !showHelp
            debugLog(showHelp ? 'Showing' : 'Closing', 'help dialog...')
            break;
          default:
            break;
        }
      }
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

  const ALIAS_SEPARATOR = '::'
  const enrichLink = (link: CommandData & { aliases?: string}): CommandData => {
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
    let value = link.value || link.name
    if (link.aliases) {
      value += (ALIAS_SEPARATOR + link.aliases)
    }
    return {
      ...link,
      action,
      value
    }
  }

  const links: CommandData[] = [
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/dnnsmnstrr" },
    { name: "Spotify", aliases: 'music playlists', icon: Music, url: "https://open.spotify.com/user/dennismuensterer" },
    { name: "Telegram", aliases: 'messages chats', icon: Send, url: "https://t.me/dnnsmnstrr" },
    { name: "LinkedIn", aliases: 'work professional', icon: Linkedin, url: "https://www.linkedin.com/in/dennismuensterer" },
    { name: "Twitter/X", icon: Twitter, url: "https://twitter.com/dnnsmnstrr" },
    { name: "CV", aliases: 'resume curriculum vitae', icon: ScrollText, url: "https://cv.muensterer.tech" },
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
      { name: 'Settings', aliases: 'configuration setup', icon: Settings, url: '/settings' },
      { name: 'Keyboard Shortcuts', aliases: 'keyboard shortcuts help assistance hotkeys', icon: Keyboard, action: () => {showHelp = true; $isCommandActive = false} },
      { name: 'Go Forward', icon: ArrowRight, action: () => window.history.forward() },
      { name: 'Go Back', icon: ArrowLeft, action: () => window.history.back() },
      { name: 'Reload', icon: ArrowLeft, action: reloadPage },
    ].filter(link => $page.url.pathname !== link.url).map(enrichLink),
    links,
    system: [
      { name: 'Toggle Dark Mode', value: 'theme', icon: $mode === 'light' ? Sun : Moon, action: toggleMode },
      { name: ($debug ? 'Disable' : 'Enable') + ' Debug Mode', icon: $debug ? BugOff : Bug, action: toggleDebug },
    ]
  } as Record<string, CommandData[]>
</script>

<Command.Dialog bind:open={$isCommandActive} >
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    {#each Object.entries(commandConfig) as [group, commands]}
      <Command.Group heading={capitalize(group)}>
        {#each commands as command}
          <Command.Item onSelect={command.action} value={command.value}>
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
      <Command.Item>
        <Palette class="mr-2" />
        Reset theme colors
      </Command.Item>
    </Command.Group>
    <Command.Group heading="Fun">
      <button use:confettiAction class="w-full">
        <Command.Item value="confetti::party popper celebrate celebration">
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

<Dialog.Root open={showHelp} onOpenChange={(value) => showHelp = value}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Keyboard Shortcuts</Dialog.Title>
      <Dialog.Description>
        There are many different shortcuts and features to explore on this page. Here is a selection of the most obvious ones:
      </Dialog.Description>
    </Dialog.Header>
    <List class="space-y-4">
      {#each shortcuts as shortcut}
         <li class="flex">
          <div class="min-w-20">
            {#if Array.isArray(shortcut.key)}
              {#each shortcut.key as singleKey, index}
                <Kbd>{singleKey}</Kbd>
                {#if index < shortcut.key.length-1}
                  <span class="pr-1">+</span>
                {/if}
              {/each}
            {:else}
              <Kbd>{shortcut.key}</Kbd>
            {/if}
          </div>
          {shortcut.description}
        </li>
      {/each}
    </List>
  </Dialog.Content>
</Dialog.Root>
