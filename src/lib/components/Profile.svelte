<script>
  import * as Card from "$lib/components/ui/card";
  import * as Avatar from "$lib/components/ui/avatar";
	import { NAME_ABBREVIATION, OWNER_NAME, descriptions } from "$lib/config";
  import Typewriter from "svelte-typewriter";
</script>

  <Card.Header class="flex flex-row items-center gap-5 flex-wrap">
    <Avatar.Root class="h-16 w-16">
      <Avatar.Image src="https://github.com/dnnsmnstrr.png" alt="@dnnsmnstrr" />
      <Avatar.Fallback>{NAME_ABBREVIATION}</Avatar.Fallback>
    </Avatar.Root>
    <div class="flex flex-col gap-2">
      <Card.Title>{OWNER_NAME}</Card.Title>
      <Card.Description class="h-4">
        <Typewriter mode="loopRandom" interval={100} delay={0} cursor={false}>
          {#each descriptions as description}
            {#if typeof description === 'object'}
              <a href={description.href} target="_blank">{description.name}</a>
            {:else}
               <span>{description}</span>
            {/if}
          {/each}
        </Typewriter>
      </Card.Description>
    </div>
  </Card.Header>