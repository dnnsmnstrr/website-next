<script lang="ts">
	import H1 from "$lib/components/typography/H1.svelte";
  import * as Card from "$lib/components/ui/card";
	import SettingsForm from "./SettingsForm.svelte";
</script>

<H1>Settings</H1>

<Card.Root>
  <Card.Header>
    <Card.Title>
      Look & Feel
    </Card.Title>
  </Card.Header>
  <Card.Content>
    <SettingsForm />
  </Card.Content>
</Card.Root>