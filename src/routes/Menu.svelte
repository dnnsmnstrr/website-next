<script lang="ts">
	import { bookmark, closeWindow, isBrowserInFullscreen, printPage, toggleFullscreen } from "$lib/browser";
	import * as Menubar from "$lib/components/ui/menubar";
	import { WEBSITE_NAME } from "$lib/config";
	import { toggleMode } from "mode-watcher";
</script>

<Menubar.Root class="rounded-none border-b border-none">

	<Menubar.Menu>
		<Menubar.Trigger class="font-bold">{WEBSITE_NAME}</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item href="/about">About {WEBSITE_NAME}</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item href="/settings">
        Settings... <Menubar.Shortcut>⌘,</Menubar.Shortcut>
			</Menubar.Item>
      <Menubar.Separator />
			<Menubar.Item on:click={closeWindow}>
				Quit {WEBSITE_NAME} <Menubar.Shortcut>⌘Q</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	<Menubar.Menu>
		<Menubar.Trigger class="relative">File</Menubar.Trigger>
		<Menubar.Content>
      <Menubar.Item href="/about" target="_blank">
        New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
      </Menubar.Item>
			<Menubar.Item on:click={closeWindow}>
				Close Window <Menubar.Shortcut>⌘W</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item on:click={printPage}>
				Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item disabled>
				Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item disabled>
				Cut <Menubar.Shortcut>⌘X</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Copy <Menubar.Shortcut>⌘C</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Paste <Menubar.Shortcut>⌘V</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item on:click={() => document.execCommand("selectall")}>
				Select All <Menubar.Shortcut>⌘A</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Deselect All <Menubar.Shortcut>⇧⌘A</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Emoji & Symbols{" "}
				<Menubar.Shortcut>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="h-4 w-4"
						viewBox="0 0 24 24"
					>
						<circle cx="12" cy="12" r="10" />
						<path
							d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
						/>
					</svg>
				</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
      <Menubar.Item on:click={() => window.location.reload()}>
				Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item on:click={toggleFullscreen}>{isBrowserInFullscreen() ? 'Exit' : 'Enter'} Full Screen <Menubar.Shortcut>⌘F</Menubar.Shortcut></Menubar.Item>
      <Menubar.Item on:click={toggleMode}>
				Toggle Dark Mode <Menubar.Shortcut>⌘M</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	<Menubar.Menu>
		<Menubar.Trigger class="hidden md:block">Bookmarks</Menubar.Trigger>
		<Menubar.Content>
      <Menubar.Item on:click={() => bookmark(WEBSITE_NAME, window.location.href)}>
				Bookmark this page <Menubar.Shortcut>⌘D</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Universe</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item href="https://muensterer.lol" target="_blank">Current Homepage</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>