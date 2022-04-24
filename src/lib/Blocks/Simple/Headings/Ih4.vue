<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: IconHeadingBlock<IsSingle>
}
const props = defineProps<Props>();
const presets = {
  def: "title is-4-desktop is-5-touch mt-2",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <h4 :id="blk.id" :class="cls">
    <span v-if="blk.icon" class="icon mx-3">
      <i :class="blk.icon" aria-hidden="true" />
    </span>
    {{ blk.$text }}
  </h4>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors.scss" as c;
h4 {
  border-bottom: solid 2px c.$primary;
  color: c.$primary-text;
}
</style>
