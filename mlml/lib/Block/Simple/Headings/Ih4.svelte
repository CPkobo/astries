<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: IconHeadingBlock<string> = {
    type: "Icon Heading 4",
    icon: "",
    $text: "Icon Heading 4",
  };

  const presets = {
    def: "title is-4 has-text-primary mt-1",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<h4 id={blk.id} class="{cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {#if blk.icon !== ""}
    <span class="icon mx-3">
      <i class={blk.icon} aria-hidden="true" />
    </span>
  {/if}
  {blk.$text}
</h4>

<style lang="scss">
  h4 {
    border-bottom: solid 2px teal;
  }
</style>
