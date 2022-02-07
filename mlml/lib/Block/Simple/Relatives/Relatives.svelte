<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: RelativeBlock<string> = {
    type: "Relatives",
    $articles: [],
  };
  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;

  $: title = blk.$title ? blk.$title : "Relating...";
</script>

<div id={blk.id} class="content {cls} {blk.classes}">
  <h4>{title}</h4>
  {#each blk.$articles as art}
    <div class="card article-box">
      <img class="image" src={art.src} alt={art.$alt} />
      <div>
        <h5>{art.$title}</h5>
        <p>{art.$description}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  @media (min-width: 1024px) {
    div.article-box {
      display: flex;
    }

    div.article-box div {
      flex-grow: 1;
      padding: 1rem;
    }

    div.article-box img {
      flex-grow: 0;
      max-width: 30%;
    }
  }
</style>
