<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  import Singlenav from "./singlenav.svelte";
  import Multinav from "./multinav.svelte";
  import Sidemenu from "./sidemenu.svelte";

  import { langset } from "../../../stores/langs";
  import { navs } from "../../../stores/navigations";

  $: navigations = $navs[$langset.crt] as NavigationMenu[];

  function toggleSidemenu() {
    showSidebar = !showSidebar;
  }

  let showSidebar = false;

  onMount(() => {
    showSidebar = false;
  });
</script>

<header>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a href="{base}/">
        <img src="{base}/system/header.ico" alt="Logo" />
      </a>
      <div class="navbar-burger mr-5 mt-2 mb-2">
        <button class="button is-medium" on:click={toggleSidemenu}>
          <i class="fa fa-bars" aria-hidden="true" />
        </button>
      </div>
    </div>
    <!-- <div>
      <h3>{$langset.crt}</h3>
    </div> -->

    <div class="navbar-menu">
      <div class="navbar-start">
        {#each navigations as hnav}
          {#if hnav.items}
            {#if hnav.items.length > 1}
              <Multinav menu={hnav} />
            {:else}
              <Singlenav menu={hnav} />
            {/if}
          {/if}
        {/each}
      </div>

      <div class="navbar-end" />
    </div>
  </nav>
</header>

{#if showSidebar}
  <Sidemenu on:sidemenuClicked={toggleSidemenu} />
  <button
    class="button is-white is-fullwidth is-aside-close"
    on:click={toggleSidemenu}
  >
    メニューを閉じる
  </button>
{/if}

<style lang="scss">
  nav {
    font-weight: bolder;
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: $heading-color;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 10%;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: $accent;
  }

  button.is-aside-close {
    background-color: $grey;
  }
</style>
