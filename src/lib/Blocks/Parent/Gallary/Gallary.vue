<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import Image from "$lib/Blocks/Child/Image.vue"
interface Props {
  blk: GallaryBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <div class="is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-stretch">
      <Image v-for="img in blk.$blks" :blk="img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
