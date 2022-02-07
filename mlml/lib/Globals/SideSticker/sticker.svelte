<script lang="ts">
  import Menu from "./menu.svelte";
  import Contact from "./contact.svelte";
  import Posts from "../../Utils/posts.svelte";

  export let hasMenu = true;
  export let hasContact = true;
  export let hasPosts = true;
</script>

<div class="stick-menu">
  {#if hasMenu}
    <Menu />
  {/if}
  {#if hasContact}
    <Contact />
  {/if}
  {#if hasPosts}
    <Posts />
  {/if}
</div>

<style lang="scss">
  div.stick-menu {
    background-color: $pure-white;
    margin-top: 50px;
    margin-right: 10%;
    width: 20vw;
    border: double 1px;
    position: sticky;
    top: 1.4rem;
  }
</style>
