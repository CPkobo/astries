<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import HoriItem from "./HoriItem.vue"
interface Props {
  blk: HorizontalBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)

const size =
  props.blk.$items.length < 3 ? "column is-one-third"
    : props.blk.$items.length < 5 ? "column is-one-quater"
      : "column"
</script>

<template>
  <div :id="blk.id" :class="cls">
    <div class="columns">
      <HoriItem v-for="itm in blk.$items" :itm="itm" :size="size" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-card {
  background-color: rgba(220, 220, 220, 0.5);
}
</style>
