<script lang="ts">
  import { fade } from "svelte/transition";

  export let blk: SubHeroBlock<string> = {
    type: "Sub Hero",
    src: "",
    $alt: "",
    $title: "",
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<section
  class="{cls} hero is-light is-fullheight mb-5"
  id="hero"
  style="background-image: url({blk.src});"
>
  <div class="hero-body" in:fade>
    <div class="container top-title">
      <h2 class="title top-title is-size-1" in:fade={{ delay: 800 }}>
        {@html blk.$title}
      </h2>
    </div>
  </div>
</section>

<style>
  section#hero {
    background-blend-mode: darken;
    background-size: cover;
    background-repeat: no-repeat;
  }
  div.top-title {
    vertical-align: middle;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2rem;
  }

  /* div.top-title:hover {
    transition: opacity 0.3s;
    opacity: 0.8;
  } */
</style>
