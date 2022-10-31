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
    <figure v-if="!blk.href">
      <img :src="blk.src" alt="blk.$alt" />
      <figcaption v-if="blk.caption">{{ blk.caption }}</figcaption>
    </figure>

    <a v-else-if="blk.href.startsWith('http')" :href="blk.href" target="_blank">
      <figure>
        <img :src="blk.src" :alt="blk.$alt" />
        <figcaption v-if="blk.caption">{{ blk.caption }}</figcaption>
      </figure>
    </a>

    <a v-else-if="blk.href" :href="blk.href">
      <figure>
        <img :src="blk.src" alt="blk.$alt" />
        <figcaption v-if="blk.caption">{{ blk.caption }}</figcaption>
      </figure>
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
