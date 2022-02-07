<script lang="ts">
  export let blk: SubBarBlock<string> = {
    type: "Sub Bar",
    $title: "",
  };

  const presets = {
    def: "is-small is-primary",
  };

  $: cls = presets[blk.preset] || presets.def;
</script>

<section class="hero {cls}">
  <div class="hero-body">
    <h1 class="title">{blk.$title}</h1>
  </div>
</section>

<style>
  h1 {
    text-align: center;
  }
</style>
