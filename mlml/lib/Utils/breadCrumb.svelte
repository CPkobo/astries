<script lang="ts">
  import { base } from "$app/paths";
  import { langset } from "../../stores/langs";

  export let breadCrumb: BreadcrumbList[] | undefined = [];
</script>

{#if breadCrumb !== undefined}
  <nav class="breadcrumb is-centered mt-1" aria-label="breadcrumbs">
    <ul>
      {#each breadCrumb as crumb, cx}
        {#if cx < breadCrumb.length - 1}
          <li><a href="{base}{crumb.item}--{$langset.crt}">{crumb.name}</a></li>
        {:else}
          <li class="is-active">
            <!-- <a href="{base}{crumb.item}--{$langset.crt}">{crumb.name}</a> -->
            <a href="{base}/">{crumb.name}</a>
          </li>
        {/if}
      {/each}
    </ul>
  </nav>
{/if}
