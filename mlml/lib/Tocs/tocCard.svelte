<script lang="ts">
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import { langset } from "../../stores/langs";

  export let single: SingleTOC<string>;

  function move(link: string) {
    if (link === "") {
      return;
    } else {
      goto(`${link}--${$langset.crt}`);
    }
  }
</script>

<div
  class="card toc-card my-3 is-pulled-left"
  on:click={() => {
    move(base + single.href);
  }}
>
  <div class="card-image">
    <figure class="image is-16by9">
      {#if single.img !== "" && single.img !== "/"}
        <img src="{base}{single.img}" alt={single.$summary} />
      {:else}
        <img src="{base}/pict/defaultimg.jpg" alt={single.$summary} />
      {/if}
    </figure>
  </div>
  <div class="card-content">
    <div class="media-content px-3">
      <p class="title is-4">{single.$title}</p>
    </div>
  </div>
  <div class="content p-5">
    <p class="is-size-5">{single.$summary}</p>
  </div>
</div>

<style lang="scss">
  div.toc-card {
    &:hover {
      background-color: green;
      // border-bottom: solid 3px teal;
      transition: 0.5s;
      // filter: drop-shadow(1px 1px 1px green);
    }

    @media (min-width: 1024px) {
      width: 30%;
    }
  }
</style>
