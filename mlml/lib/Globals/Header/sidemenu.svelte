<script lang="ts">
  import { base } from "$app/paths";
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import { langset } from "../../../stores/langs";
  import { navs } from "../../../stores/navigations";

  $: navigations = $navs[$langset.crt] as NavigationMenu[];

  const dispatch = createEventDispatcher();

  function sidemenuClicked() {
    dispatch("sidemenuClicked");
  }
</script>

<aside class="menu pl-5" in:slide out:slide>
  {#each navigations as snav}
    <p class="menu-label">
      {snav.category}
    </p>
    {#if snav.items}
      <ul class="menu-list">
        {#each snav.items as item}
          <li>
            <a href="{base}{item.link}" on:click={sidemenuClicked}
              >{item.caption}</a
            >
          </li>
        {/each}
      </ul>
    {:else}
      <ul class="menu-list">
        <li class="menu-item">
          <a href="{base}{snav.root}" on:click={sidemenuClicked}
            >{snav.category}</a
          >
        </li>
      </ul>
    {/if}
  {/each}
</aside>

<style lang="scss">
  li.menu-item:hover {
    background-color: $accent;
  }

  aside.menu {
    z-index: 10;
  }
</style>
