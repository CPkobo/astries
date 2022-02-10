<script lang="ts">
  import { fade } from "svelte/transition";
  import BlockControl from "$lib/Block/BlockControl.svelte";

  export let dtime: number = 0;

  // export let caption: string = '';
  export let blk: TableBlock<IsSingle> = {
    type: "Table",
    $th: [],
    $trs: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<svelte:head />

<div id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  <table class="table is-fullwidth is-striped is-hoverable">
    {#if blk.$th}
      <thead>
        <tr>
          {#each blk.$th as hc}
            <th>{hc}</th>
          {/each}
        </tr>
      </thead>
    {/if}
    <tbody>
      {#each blk.$trs as tr}
        <tr>
          {#each tr as tc}
            <td>
              <BlockControl blks={[tc]} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
