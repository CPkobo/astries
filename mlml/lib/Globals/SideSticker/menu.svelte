<script lang="ts">
  import { base } from "$app/paths";
  import { navs } from "../../../stores/navigations";
  import { langset } from "../../../stores/langs";
  import { page } from "$app/stores";

  import FilledBar from "../lib/Utils/filledBar.svelte";

  $: root = $page.path.split("/")[1];
  let menuroot: NavigationMenu = {
    category: "",
    root: "",
    items: [],
  };
  $: {
    const langmenu: NavigationMenu[] = $navs[$langset.crt];
    for (const menu of langmenu) {
      if (menu.root === `/${root}`) {
        menuroot = menu;
        break;
      }
    }
  }
</script>

{#if menuroot.category !== ""}
  <aside class="stick-menu has-text-centered pb-3">
    <FilledBar title={menuroot.category} />
    <ul class="menu-list is-size-3">
      {#each menuroot.items as item}
        <li>
          <a class="menu-item" href="{base}{item.link}">{item.caption}</a>
        </li>
      {/each}
    </ul>
  </aside>
{/if}

<style lang="scss">
  ul.menu-list li {
    text-decoration: underline;
  }
  a.menu-item:hover {
    background-color: green;
    color: green-text;
  }
</style>
