<script lang="ts">
  import { base } from "$app/paths";
  import { langset } from "../../../stores/langs";
  import { valid } from "../../../stores/navigations";
  export let menu: NavigationMenu;
</script>

<a
  class="navbar-item is-size-5"
  sveltekit:prefetch
  href="{base}{menu.root}--{$langset.crt}">{menu.category}</a
>
