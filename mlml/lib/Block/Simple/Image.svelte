<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: ImageBlock<string> = {
    type: "Image",
    src: "",
    $alt: "/",
  };

  const presets = {
    def: "",
    half: "half-view",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<div id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  {#if blk.href}
    {#if blk.href.startsWith("http")}
      <a href={blk.href} target={blk.target}>
        <img src={blk.src} alt={blk.$alt} />
      </a>
    {:else}
      <a href={blk.href} target={blk.target}>
        <img src={blk.src} alt={blk.$alt} />
      </a>
    {/if}
  {:else}
    <img src={blk.src} alt={blk.$alt} />
  {/if}
</div>

<style lang="scss">
  div.half-view {
    @media (min-width: 1023px) {
      max-width: 27vw;
    }
  }
</style>
