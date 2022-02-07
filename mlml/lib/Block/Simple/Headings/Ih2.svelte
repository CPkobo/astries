<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: IconHeadingBlock<string> = {
    type: "Icon Heading 2",
    icon: "",
    $text: "Icon Heading 2",
  };

  const presets = {
    def: "title is-2 has-text-primary mt-2",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<h2 id={blk.id} class="{cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {#if blk.icon !== ""}
    <span class="icon mx-3">
      <i class={blk.icon} aria-hidden="true" />
    </span>
  {/if}
  {blk.$text}
</h2>

<style lang="scss">
  h2 {
    border-bottom: solid 2px teal;
  }
</style>
