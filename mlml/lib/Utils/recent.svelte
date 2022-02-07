<script lang="ts">
  import Posts from "../lib/Utils/posts.svelte";
  import Twline from "../lib/Utils/twline.svelte";
</script>

<div class="container recent-box">
  <div class="content">
    <h2 class="title is-2 has-text-centered">最近の動き</h2>
    <div
      class="is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-stretch"
    >
      <Posts />
      <Twline />
    </div>
  </div>
</div>

<style lang="scss">
  .recent-box {
    background-color: $pure-white;
  }
</style>
