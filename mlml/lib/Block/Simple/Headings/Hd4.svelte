<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: HeadingBlock<string> = {
    type: "Heading 4",
    $text: "Heading 4",
  };

  const presets = {
    def: "title is-4",
    center: "title is-4 has-text-centered",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<h4 id={blk.id} class="{cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {blk.$text}
</h4>

<style>
  h4 {
    margin-top: 0.5em;
  }
</style>
