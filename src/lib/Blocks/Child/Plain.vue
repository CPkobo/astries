<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: PlainBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "px-3",
};

const cls = classNaming("content", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <p v-for="t in blk.$texts">{{ t }}</p>
  </div>
</template>
