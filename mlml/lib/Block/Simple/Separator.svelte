<script lang="ts">
  import { fade } from "svelte/transition";
  export let dtime: number = 0;
</script>

<hr in:fade={{ delay: dtime }} />

<style lang="scss">
  hr {
    height: 1px;
    border: solid 1px teal;
  }
</style>
