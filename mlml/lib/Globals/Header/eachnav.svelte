<script lang="ts">
  import { base } from "$app/paths";
  export let item: NavItem;
</script>

<a class="navbar-item is-size-5" sveltekit:prefetch href="{base}{item.link}"
  >{item.caption}</a
>
