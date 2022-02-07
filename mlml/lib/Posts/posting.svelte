<script lang="ts">
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  export let pg: PostIndex = {
    title: "",
    pubstr: "",
    modstr: "",
    summary: "",
    href: "",
  };
  $: src = pg.image ? pg.image : `${base}/system/defaultimg.jpg`;

  function move(href: string) {
    if (href === "") {
      return;
    } else {
      goto(`./${href}`);
    }
  }
</script>

<div class="box post-box m-3" on:click={() => move(pg.href)}>
  <div class="post-image-box">
    <img {src} alt={pg.title} />
  </div>
  <div class="post-text-box p-3">
    <h3>{pg.title} ({pg.modstr})</h3>
    <p>{pg.summary}</p>
    <a href={pg.href} sveltekit:prefetch>...</a>
  </div>
</div>

<style lang="scss">
  div.post-box {
    display: flex;

    &:hover {
      background-color: green;
    }
  }

  div.post-image-box {
    flex-grow: 0;
    max-width: 25vw;
  }

  div.flow-text {
    width: 100%;
    padding: 1rem;
    flex-grow: 1;
  }
</style>
