<script lang="ts">
	import Heading from '$lib/components/typography/Heading.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { getRedirectURL, type Redirect } from '$lib/redirect';

  export let data
  function handleRedirect(redirect: Redirect) {
    const redirectUrl = getRedirectURL(redirect);
    window.open(redirectUrl, "_blank");
  }
  let filterQuery = ''
  const searchFilter = (redirect: Redirect) => {
    if (!filterQuery) {
      return true
    }

    return redirect.name.includes(filterQuery.toLowerCase()) || redirect.aliases?.some(alias => alias.includes(filterQuery))
  }
  let filteredRedirects = data.redirects
  $: if (filterQuery || data.redirects) {
    filteredRedirects = data.redirects.filter(searchFilter); filterQuery
  }
</script>

<div class="flex items-start justify-between">
  <Heading>Redirects</Heading>
  <Input placeholder="Search..." type="search" class="w-52 mt-2" bind:value={filterQuery} />
</div>

<Table.Root class="mb-4">
  <Table.Caption>{filterQuery ? `Matching redirects: ${filteredRedirects.length}, ` : ''}Total: {data.redirects.length}</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Name</Table.Head>
      <Table.Head>Description</Table.Head>
      <Table.Head>Aliases</Table.Head>
      <Table.Head class="text-right">URL</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each filteredRedirects as redirect}
      <Table.Row on:click={() => handleRedirect(redirect)}>
        <Table.Cell class="font-medium">{redirect.name}</Table.Cell>
        <Table.Cell>{redirect.description || '-'}</Table.Cell>
        <Table.Cell>{redirect.aliases?.join(', ') || '-'}</Table.Cell>
        <Table.Cell class="text-right">{redirect.url || '/' + redirect.name.toLocaleLowerCase()}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>