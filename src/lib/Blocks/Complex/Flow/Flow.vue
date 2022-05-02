<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import FlowItem from "./FlowItem.vue"
interface Props {
  blk: FlowBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "",
};

const cls = classNaming("content", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <div v-for="itm, ox in blk.$items.slice(0, blk.$items.length -1)">
      <div class="box">
        <FlowItem :itm="itm" :order="ox + 1" />
      </div>
      <div class="triangle" />
    </div>
    <div class="box">
      <FlowItem :itm="blk.$items[blk.$items.length - 1]" :order="blk.$items.length" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors" as c;
div.triangle {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 26px 15px 0 15px;
  border-color: c.$primary transparent transparent transparent;
}
</style>