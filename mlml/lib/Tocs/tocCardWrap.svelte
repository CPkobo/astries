<script lang="ts">
  import TocCard from "./tocCard.svelte";
  export let toc: TOC<string>;
</script>

<section class="section">
  <div
    class="content is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-stretch"
  >
    {#each toc.data as single}
      <TocCard {single} />
    {/each}
  </div>
</section>

<style>
  /* div.card-index {
    float: left;
  } */
</style>
