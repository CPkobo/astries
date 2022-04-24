<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: SubBarBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <section :class="cls">
    <div class="aries-subbar">
      <h1 class="aries-subbar-title">{{ blk.$title }}</h1>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors.scss" as c;
h1 {
  text-align: center;
}
div.aries-subbar {
  background-color: c.$primary-nega;
  color: c.$primary-nega-text;
}
</style>
