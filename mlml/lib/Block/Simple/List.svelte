<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: ListBlock<string[]> = {
    type: "List",
    $texts: [],
  };

  const presets = {
    def: "",
    circle: "list-circled",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<ul id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {#each blk.$texts as t}
    <li>{@html t}</li>
  {/each}
</ul>
