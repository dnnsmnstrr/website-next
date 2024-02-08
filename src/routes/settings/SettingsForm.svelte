<script lang="ts" context="module">
  import { z } from "zod";
  export const settingsSchema = z.object({
    debug: z.boolean().default(false),
    mode: z.string().default('system')
  });
  export type SettingsSchema = typeof settingsSchema;
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Label } from "$lib/components/ui/label";
  import type { SuperValidated } from "sveltekit-superforms";
  import { mode, setMode, resetMode, } from "mode-watcher";
	import { debug } from "$lib/stores/app";

  let form: SuperValidated<SettingsSchema>

  function handleModeChange(value: string) {
    switch (value) {
      case 'light':
      case 'dark':
        setMode(value)
        break;
      default:
        resetMode()
    }
  }
</script>

<Form.Root schema={settingsSchema} {form} let:config>
  <Form.Field {config} name="mode">
    <Form.Item class="space-y-3 pb-4">
      <Form.Label>Theme Mode</Form.Label>
      <Form.RadioGroup class="flex flex-col space-y-1" value={$mode} onValueChange={handleModeChange}>
        <Form.Item class="flex items-center space-x-3 space-y-0">
          <Form.RadioItem value="light" id="light" />
          <Label for="light" class="font-normal">Light</Label>
        </Form.Item>
        <Form.Item class="flex items-center space-x-3 space-y-0">
          <Form.RadioItem value="dark" id="dark" />
          <Label for="dark" class="font-normal"
            >Dark</Label
          >
        </Form.Item>
        <Form.Item class="flex items-center space-x-3 space-y-0">
          <Form.RadioItem value="" id="system" />
          <Label for="system" class="font-normal">System</Label>
        </Form.Item>
      </Form.RadioGroup>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="debug">
    <Form.Item
      class="flex flex-row items-start space-x-3 space-y-0"
    >
      <Form.Checkbox checked={$debug} onCheckedChange={(value) => $debug = !!value}/>
      <div class="space-y-1 leading-none">
        <Form.Label>Enable debug mode</Form.Label>
        <Form.Description>
          This will enable more verbose logging in the console.
        </Form.Description>
      </div>
    </Form.Item>
  </Form.Field>
</Form.Root>