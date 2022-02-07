<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: HeadingBlock<string> = {
    type: "Heading 3",
    $text: "Heading 3",
  };

  const presets = {
    def: "title is-3 my-4",
    center: "title is-3 my-4 has-text-centered",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<h3 id={blk.id} class="{cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {blk.$text}
</h3>

<style>
  h3 {
    margin-top: 0.5em;
  }
</style>
