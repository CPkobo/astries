<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: IconHeadingBlock<IsSingle>
}
const props = defineProps<Props>();
const presets = {
  def: "title is-3-desktop is-4-touch mt-2",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <h3 :id="blk.id" :class="cls">
    <span v-if="blk.icon" class="icon mx-3">
      <i :class="blk.icon" aria-hidden="true" />
    </span>
    {{ blk.$text }}
  </h3>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors.scss" as c;
h3 {
  border-bottom: solid 2px c.$primary;
  color: c.$primary-text;
}
</style>
