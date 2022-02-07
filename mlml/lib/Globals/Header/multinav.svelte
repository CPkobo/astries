<script lang="ts">
  import { base } from "$app/paths";
  import { langset } from "../../../stores/langs";
  import Eachnav from "./eachnav.svelte";
  export let menu: NavigationMenu;
</script>

<div class="navbar-item has-dropdown is-hoverable">
  <a
    class="navbar-link is-size-5 is-arrowless"
    href="{base}{menu.root}--{$langset.crt}"
  >
    {menu.category}
  </a>
  <div class="navbar-dropdown">
    {#each menu.items as item}
      <Eachnav {item} />
    {/each}
  </div>
</div>
