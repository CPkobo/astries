<script lang="ts">
  import { base } from "$app/paths";
  import { langset } from "../../../stores/langs";
  import { navs, valid } from "../../../stores/navigations";

  export let href = "";
  export let disp = "";
  let disabled = true;

  $: {
    const path_lang = href.split("--");
    if (path_lang.includes("/service-worker.js")) {
      // pass
    } else {
      const path = path_lang[0];
      const lang = path_lang[1] || $langset.valid[0];
      disabled = $valid[lang].indexOf(path) === -1;
    }
  }
</script>

{#if disabled}
  <p class="navbar-item disabled">{disp}</p>
{:else}
  <a class="navbar-item" href="{base}{href}">{disp}</a>
{/if}

<style lang="scss">
  p.disabled {
    color: $disabled-color;
  }
</style>
