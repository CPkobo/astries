<script lang="ts">
  export let blk: Spacer;

  const mx =
    blk.x === undefined || blk.x === 0 || blk.x > 6 ? "" : `mx-${blk.x}`;
  const my =
    blk.y === undefined || blk.y === 0 || blk.y > 6 ? "" : `my-${blk.y}`;
</script>

<div id={blk.id} class="{mx} {my} {blk.classes}">&nbsp;</div>
