<script lang="ts">
  import { fade } from "svelte/transition";
  import BlockControl from "$lib/Block/BlockControl.svelte";

  export let dtime: number = 0;

  export let blk: ColumnLayout<IsSingle> = {
    type: "COLUMN",
    $blkss: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<div
  id={blk.id}
  class="content columns {cls} {blk.classes}"
  in:fade={{ delay: dtime }}
>
  {#each blk.$blkss as blks}
    <div class="column">
      <BlockControl {blks} />
    </div>
  {/each}
</div>

<style lang="scss">
</style>
