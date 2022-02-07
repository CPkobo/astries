<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;

  export let blk: DefineBlock<string[][]> = {
    type: "Define",
    $texts: [],
  };

  const presets = {
    def: "",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<div id={blk.id} class="content {cls} {blk.classes}">
  <dl in:fade={{ delay: dtime }}>
    {#each blk.$texts as t}
      <dt>{t[0]}</dt>
      {#if t.length > 1}
        {#each t.slice(1) as dd}
          <dd>{dd}</dd>
        {/each}
      {/if}
    {/each}
  </dl>
</div>
