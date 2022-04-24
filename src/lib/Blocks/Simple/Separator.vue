<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: Separator
}

const props = defineProps<Props>();
const cls = classNaming("", props.blk.classes, props.blk.preset, null)
</script>
<template>
  <hr />
</template>

<style lang="scss" scoped>
hr {
  height: 1px;
  border: solid 1px teal;
}
</style>
