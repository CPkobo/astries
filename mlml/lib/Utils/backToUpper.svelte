<script lang="ts">
  import { base } from "$app/paths";
  export let href: string = "/";
</script>

<div class="has-text-right">
  <a href="{base}{href.substring(0, href.lastIndexOf('/')) + '/toc'}">戻る</a>
</div>

<style>
  a {
    margin: 0;
  }
</style>
