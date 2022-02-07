<script lang="ts">
  import { fade } from "svelte/transition";
  import BlockControl from "$lib/Block/BlockControl.svelte";

  export let dtime: number = 0;

  export let blk: HorizontalBlock<string, string[], string[][]> = {
    type: "Horizontal",
    $items: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;

  let sizing = "";

  $: {
    if (blk.$items.length < 3) {
      sizing = "is-one-third";
    } else if (blk.$items.length < 5) {
      sizing = "is-one-quater";
    } else {
      sizing = "is-2";
    }
  }

  function move(link: string) {
    if (!link) {
      return;
    } else {
      goto(link);
    }
  }
</script>

<div id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  <div class="columns">
    {#each blk.$items as itm}
      <div class="column {sizing}">
        <div class="card my-3 horizontal-card" on:click={() => move(itm.link)}>
          <div class="card-image">
            <figure class="image is-4by4">
              {#if itm.img !== ""}
                <img src={itm.img} alt={itm.$title} />
              {:else}
                <img src="/system/defaultimg.jpg" alt={itm.$title} />
              {/if}
            </figure>
          </div>
          <div class="card-content">
            <div class="media-content px-3">
              <p class="title is-4">{itm.$title}</p>
            </div>
          </div>
          <div class="content p-5">
            <BlockControl blks={itm.$blks} />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .horizontal-card {
    background-color: rgba(220, 220, 220, 0.5);
  }
</style>
