<script lang="ts">
  import { base } from "$app/paths";
  import { langset } from "../../../stores/langs";
  export let next: NavToOtherPage = {
    title: "",
    href: "",
  };
  export let prev: NavToOtherPage = {
    title: "",
    href: "",
  };
  export let back: NavToOtherPage = {
    title: "TOP",
    href: "/",
  };
</script>

<section class="section">
  <hr class="my-5" />

  <div class="content">
    <div class="columns">
      <div
        class="column is-two-fifths has-text-right-desktop has-text-centered"
      >
        {#if prev.title !== "" && prev.href !== ""}
          <a href="{base}{prev.href}">{prev.title}</a>
        {/if}
      </div>
      <div class="column is-one-fifths has-text-centered">
        {#if back.title !== "" && back.href !== ""}
          <a href="{base}{back.href}">{back.title}</a>
        {/if}
      </div>
      <div class="column is-two-fifths has-text-left-desktop has-text-centered">
        {#if next.title !== "" && next.href !== ""}
          <a href="{base}{next.href}">{next.title}</a>
        {/if}
      </div>
    </div>
  </div>
</section>
