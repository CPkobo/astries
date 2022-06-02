<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: ImageBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "",
  half: "half-view",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <img v-if="!blk.href" :src="blk.src" alt="blk.$alt" />

    <a v-else-if="blk.href.startsWith('http')" :href="blk.href" target="_blank">
      <img :src="blk.src" :alt="blk.$alt" />
    </a>

    <a v-else-if="blk.href" :href="blk.href">
      <img :src="blk.src" alt="blk.$alt" />
    </a>
  </div>
</template>

<style lang="scss">
div.half-view {
  @media (min-width: 1023px) {
    max-width: 23vw;
  }
}
</style>
