<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '$lib/components/typography/Heading.svelte';
	import * as Table from '$lib/components/ui/table';
	import { getRedirectURL, type Redirect } from '$lib/redirect';

  export let data
  function handleRedirect(redirect: Redirect) {
    const redirectUrl = getRedirectURL(redirect);
    window.location.assign(redirectUrl)
  }
</script>

<Heading>Redirects</Heading>
{#await data.redirects}
  Loading Redirects
{:then redirects}
  <Table.Root>
  <Table.Caption>Available redirects</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Name</Table.Head>
      <Table.Head>Description</Table.Head>
      <Table.Head>URL</Table.Head>
      <Table.Head class="text-right">Aliases</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each redirects as redirect}
      <Table.Row on:click={() => handleRedirect(redirect)}>
        <Table.Cell class="font-medium">{redirect.name}</Table.Cell>
        <Table.Cell>{redirect.description || '-'}</Table.Cell>
        <Table.Cell>{redirect.aliases?.join(', ') || '-'}</Table.Cell>
        <Table.Cell  class="text-right">{redirect.url || '/' + redirect.name.toLocaleLowerCase()}</Table.Cell>
      </Table.Row>
    {:else}
      <!-- empty list -->
    {/each}
  </Table.Body>
</Table.Root>
{:catch error}
  Error loading redirects
{/await}