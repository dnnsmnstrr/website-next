<script>
  import * as Card from "$lib/components/ui/card";
  import * as Avatar from "$lib/components/ui/avatar";
	import { OWNER_NAME } from "$lib/config";
  import Typewriter from "svelte-typewriter";
</script>

  <Card.Header class="flex flex-row items-center gap-5 flex-wrap">
    <Avatar.Root class="h-16 w-16">
      <Avatar.Image src="https://github.com/dnnsmnstrr.png" alt="@dnnsmnstrr" />
      <Avatar.Fallback>DM</Avatar.Fallback>
    </Avatar.Root>
    <div class="flex flex-col gap-2">
      <Card.Title>{OWNER_NAME}</Card.Title>
      <Card.Description class="h-4">
        <Typewriter mode="loopRandom" interval={100} delay={0} cursor={false}>
          <a href="https://y.at/🤖💻📱⌚🎧" target="_blank">🤖💻📱⌚🎧</a>
          <span>💻 Software Developer</span>
          <span>🤖 Maker of Things</span>
          <span>📱 Maker of Apps</span>
          <span>🍕 Pizza lover</span>
          <span>🎧 Music enthusiast</span>
        </Typewriter>
      </Card.Description>
    </div>
  </Card.Header>