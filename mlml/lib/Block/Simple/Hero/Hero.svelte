<script lang="ts">
  import { fade } from "svelte/transition";
  // import ContactButton from "../lib/CTAs/contact.svelte";

  export let blk: HeroBlock<string> = {
    type: "Hero",
    src: "",
    $alt: "",
    $title: "",
    $subtitle: "",
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<section
  class="hero is-light is-fullheight mb-5 {cls}"
  id="hero"
  style="background-image: url({blk.src});"
>
  <div class="hero-body" in:fade>
    <div class="container top-title">
      <h1 class="title top-title is-size-1" in:fade={{ delay: 800 }}>
        {@html blk.$title}
      </h1>
      <h2 class="subtitle ml-3 mt-5 top-title" in:fade={{ delay: 1200 }}>
        {@html blk.$subtitle}
      </h2>
      {#if blk.cta}
        <!-- <div in:fade={{ delay: 1600 }}>
          <ContactButton />
        </div> -->
      {/if}
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
  h1.top-title {
    /* height: 12rem;
    font-size: 5rem; */
    font-weight: bolder;
  }
  @media (min-width: 1024px) {
    h1.top-title {
      font-size: 1.5em;
    }
  }
  /* div.top-title:hover {
    transition: opacity 0.3s;
    opacity: 0.8;
  } */
</style>
