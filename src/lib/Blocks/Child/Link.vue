<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: LinkBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "",
};

const rel = props.blk.target === "_blank" ? "noopener" : "";

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <a :href="blk.href" :target="blk.target" :rel="rel">{{ blk.$text }}</a>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: teal;
  text-decoration: underline;
  // margin-left: 2.5rem;
}
</style>
