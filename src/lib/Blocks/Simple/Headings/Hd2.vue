<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: HeadingBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "title is-2 my-4",
  center: "title is-2 my-4 has-text-centered",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <h2 :id="blk.id" :class="cls">{{ blk.$text }}</h2>
</template>
