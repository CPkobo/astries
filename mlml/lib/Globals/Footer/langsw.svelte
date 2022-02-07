<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { langset } from "../../../stores/langs";
  import Langlink from "./langlink.svelte";

  let rootPath = "";
  let langname = $langset.disp;

  $: rootPath = $page.path.split("--")[0];
  $: langname = $langset.disp;
  // $: {
  //   console.log(rootPath);
  // }
</script>

<div class="navbar-item has-dropdown is-hoverable">
  <p class="navbar-link is-size-6 is-arrowless  langswitch">
    LANGUAGE: {langname}
  </p>
  <div class="navbar-dropdown">
    <ul>
      <li>
        <Langlink href={rootPath} disp={$langset.disps[0]} />
      </li>
      {#each $langset.disps.slice(1) as langd, lx}
        <li>
          <Langlink href="{rootPath}--{$langset.valid[lx + 1]}" disp={langd} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  p.langswitch {
    border: 1px solid;
    font-size: 0.7em;
  }
</style>
