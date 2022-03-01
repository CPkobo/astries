<script lang="ts">
  import { fade } from "svelte/transition";
  import BlockControl from "$lib/Block/BlockControl.svelte";

  export let dtime: number = 0;

  export let blk: FeaturesBlock<IsSingle> = {
    type: "Features",
    $items: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;

  function move(link: string) {
    if (link === "") {
      return;
    } else {
      goto(base + link);
    }
  }
</script>

<div id={blk.id} class="content {cls} {blk.classes}" in:fade={{ delay: dtime }}>
  <div
    class="is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-stretch"
  >
    {#each blk.$items as itm}
      <div class="feature-box" on:click={() => move(itm.link)}>
        <h4 class="has-text-primary is-size-4 pl-3">
          {#if itm.icon !== ""}
            <!-- <span class="icon is-large fa-2x mr-2">
              <i class={itm.icon} aria-hidden="true" />
            </span> -->
          {/if}
          <span>
            {itm.$title}
          </span>
        </h4>
        <!-- <p class="pl-3 pr-3 mt-2">{itm.$text}</p> -->
        <BlockControl blks={itm.$blks} />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  h4 {
    border-bottom: dotted 2px teal;
  }

  div.feature-box {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 3rem;

    &:hover {
      background-color: green;
      transition: 0.5s;
    }
    @media (min-width: 1024px) {
      width: calc(100% - 2rem * 1);
      max-width: calc(50% - 2rem * 2);
      margin-right: auto;
      margin-left: auto;
    }
  }
</style>
