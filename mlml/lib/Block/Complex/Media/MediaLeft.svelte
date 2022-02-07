<script lang="ts">
  import { fade } from "svelte/transition";
  import BlockControl from "$lib/Block/BlockControl.svelte";

  export let dtime: number = 0;

  export let blk: MediaTextBlock<string, string[], string[][]> = {
    type: "Media Left",
    // $texts: ["Media Left"],
    $blks: [],
    src: "defaultimg.jpg",
    $alt: "Default Image",
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<div
  id={blk.id}
  class="content img-box {cls} {blk.classes}"
  in:fade={{ delay: dtime }}
>
  <img src="{base}{blk.src}" alt={blk.$alt} class="pr-5-desktop" />
  <div class="ml-2-desktop pr-5-desktop">
    <BlockControl blks={blk.$blks} />
    <!-- {#each blk.$texts as t}
      <p>{t}</p>
    {/each} -->
  </div>
</div>
<div class="is-clearfix" />

<style>
  @media (min-width: 1024px) {
    div.img-box {
      display: flex;
    }

    div.img-box div {
      flex-grow: 1;
    }

    div.img-box img {
      flex-grow: 0;
    }
  }
</style>
