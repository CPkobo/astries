<script lang="ts">
  import { fade } from "svelte/transition";
  import BlockControl from "../BlockControl.svelte";

  export let dtime: number = 0;

  export let blk: FlexLayout<string, string[], string[][]> = {
    type: "FLEX",
    $blkss: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<div
  id={blk.id}
  class="content is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-stretch {cls} {blk.classes}"
  in:fade={{ delay: dtime }}
>
  {#each blk.$blkss as blks}
    <BlockControl {blks} />
  {/each}
</div>

<style lang="scss">
</style>
