<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: HeadingBlock<string> = {
    type: "Heading 2",
    $text: "Heading 2",
    preset: "center",
  };

  const presets = {
    def: "title is-2 my-4",
    center: "title is-2 my-4 has-text-centered",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<h2 id={blk.id} class="{cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {blk.$text}
</h2>

<style>
  h2 {
    margin-top: 0.5em;
  }
</style>
