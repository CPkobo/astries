<script lang="ts">
  // export let caption: string = '';
  import BlockControl from "$lib/Block/BlockControl.svelte";

  export let blk: FlowBlock<IsSingle> = {
    type: "Flow",
    $items: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<svelte:head />

<div id={blk.id} class="content {cls} {blk.classes}">
  {#each blk.$items as itm, ix}
    <div class="box">
      <div class="flow-box">
        <div class="flow-order">
          <p class="is-size-4">{ix + 1}</p>
        </div>
        <div class="flow-text">
          <BlockControl blks={itm.$blks} />
        </div>
      </div>
    </div>
    {#if ix < blk.$items.length - 1}
      <div class="triangle" />
    {/if}
  {/each}
</div>

<style lang="scss">
  div.flow-box {
    display: flex;
  }

  div.flow-order {
    width: 5rem;
    padding: 1rem;
    text-align: center;
    vertical-align: middle;
    background-color: teal;
    color: teal-text;
    flex-grow: 0;
  }

  div.flow-text {
    width: 100%;
    padding: 1rem;
    flex-grow: 1;
  }

  div.triangle {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 26px 15px 0 15px;
    border-color: teal transparent transparent transparent;
  }
</style>
