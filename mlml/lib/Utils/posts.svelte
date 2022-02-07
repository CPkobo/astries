<script lang="ts">
  import { base } from "$app/paths";
  import { latest } from "../../stores/latest";
  import FilledBar from "./filledBar.svelte";
</script>

<aside class="pb-3 has-text-centered">
  <FilledBar title="Latest Posts" />
  <ul class="mb-3 is-size-3 post-list">
    {#each $latest as post}
      <li>
        <a href="{base}/posts/{post.href}">{post.title}</a>
      </li>
    {/each}
  </ul>
  <a href="{base}/posts/page-1">一覧へ</a>
</aside>

<!-- <aside class="pb-3 has-text-centered">
  <FilledBar title="最新の投稿" />
  <ul class="mb-3 is-size-3 post-list">
    <li>
      <a href="{base}/posts/website-renewal-notice"
        >Webサイトをリニューアルしました！</a
      >
    </li>
    <li>
      <a href="{base}/posts/liaoning-export-2021"
        >遼寧省輸出展示会の運営をサポートしました</a
      >
    </li>
    <li>
      <a href="{base}/posts/aiko-release"
        >医薬特化型AI翻訳エンジン AIKO SciLingualがリリースされました</a
      >
    </li>
  </ul>
  <a href="{base}/posts/page-1">一覧へ</a>
</aside> -->
<style lang="scss">
  .post-list li {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 0.5rem;
    text-decoration: underline;
  }

  .post-list li:hover {
    background-color: green;
    color: green-text;
  }

  .post-list li a:hover {
    color: green-text;
  }
</style>
