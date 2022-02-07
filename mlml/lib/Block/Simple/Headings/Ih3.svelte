<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: IconHeadingBlock<string> = {
    type: "Icon Heading 3",
    icon: "",
    $text: "Icon Heading 3",
  };

  const presets = {
    def: "title is-3 has-text-primary mt-1",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<h3 id={blk.id} class="{cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {#if blk.icon !== ""}
    <span class="icon mx-3">
      <i class={blk.icon} aria-hidden="true" />
    </span>
  {/if}
  {blk.$text}
</h3>

<style lang="scss">
  h3 {
    border-bottom: solid 2px teal;
  }
</style>
