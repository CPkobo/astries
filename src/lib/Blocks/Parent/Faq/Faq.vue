<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import FaqItem from "./FaqItem.vue"
interface Props {
  blk: FaqBlock<IsSingle>
}
const props = defineProps<Props>();

const thisqa = props.blk.id ? props.blk.id : ''

const presets = {
  def: "",
};

const cls = classNaming("content", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <FaqItem v-for="qa, ox in blk.$qas" :qa="qa" :order="ox + 1" :qaid="thisqa" />
  </div>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors" as c;
</style>