<script lang="ts">
  import { fade } from "svelte/transition";
  import ImageBlock from "$lib/Block/Simple/Image.svelte";

  export let dtime: number = 0;

  export let blk: GallaryBlock<IsSingle> = {
    type: "Gallary",
    $blks: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<div id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  <div
    class="is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-stretch"
  >
    {#each blk.$blks as img}
      <ImageBlock blk={img} />
    {/each}
  </div>
</div>

<style lang="scss">
</style>
