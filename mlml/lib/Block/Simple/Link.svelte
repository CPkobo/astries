<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: LinkBlock<string> = {
    type: "Link",
    $text: "Link",
    href: "/",
  };

  const presets = {
    def: "",
  };

  $: rel = blk.target === "_blank" ? "noopener" : "";

  $: cls = presets[blk.preset] || presets.def;
</script>

<div id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {#if blk.href.startsWith("http")}
    <a href={blk.href} target={blk.target} {rel}>{blk.$text}</a>
  {:else}
    <a href={blk.href}>{blk.$text}</a>
  {/if}
</div>

<style lang="scss">
  a {
    color: teal;
    text-decoration: underline;
    margin-left: 2.5rem;
  }
</style>
