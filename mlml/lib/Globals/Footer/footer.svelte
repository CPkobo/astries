<script lang="ts">
  import { base } from "$app/paths";
  import { prof } from "../../../stores/profile";
  import { langset } from "../../../stores/langs";
  import { navs } from "../../../stores/navigations";
  import Langsw from "./langsw.svelte";
  import { page } from "$app/stores";

  export let useLangSw = true;

  $: navigations = $navs[$langset.crt] as NavigationMenu[];
</script>

<footer class="footer mt-5">
  <section class="in-footer">
    <div class="columns">
      <div class="column is-one-third-desktop is-full-touch">
        <img src="{base}/system/footer.ico" alt="Logo" />
        <p>{$prof.OrganizationName} &copy; All Rights Rerserved.</p>
        {#if useLangSw}
          <Langsw />
        {/if}
      </div>
      <div class="column is-hidden-touch">
        <div class="columns">
          {#each navigations as fnav}
            <div class="column">
              <h4>{fnav.category}</h4>
              {#if fnav.items}
                <ul class="ml-1">
                  {#each fnav.items as item}
                    <li>
                      <a href="{base}{item.link}">{item.caption}</a>
                    </li>
                  {/each}
                </ul>
              {:else}
                <ul class="ml-1">
                  <li>
                    <!-- <a href="{fnav.root}/toc--{$langset.crt}">{fnav.category}</a> -->
                    <a href="{base}{fnav.root}--{$langset.crt}"
                      >{fnav.category}</a
                    >
                  </li>
                </ul>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>
</footer>

<style lang="scss">
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  section.in-footer {
    width: 80vw;
  }

  footer a {
    font-size: 1rem;
    color: teal;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
