<script lang="ts">
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: PlainBlock<string, string[]> = {
    type: "Plain",
    $texts: [],
  };

  const presets = {
    def: "px-3",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<div id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {#each blk.$texts as t}
    <p class={blk.classes}>{@html t}</p>
  {/each}
</div>
