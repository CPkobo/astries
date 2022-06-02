<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import FetItem from "./FeatureItem.vue"
interface Props {
  blk: FeaturesBlock<IsSingle>
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
      <FetItem v-for="itm in blk.$items" :itm="itm" />
    </div>
  </div>
</template>

<style lang="scss">
div.feature-box {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 3rem;

  &:hover {
    background-color: green;
    transition: 0.5s;
  }
  @media (min-width: 1024px) {
    width: calc(100% - 2rem * 1);
    max-width: calc(50% - 2rem * 2);
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
