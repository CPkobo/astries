<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import BlockControl from "$lib/Blocks/BlockControl.vue"
interface Props {
  blk: FlexLayout<IsSingle>
  lang: LangList
}
const props = defineProps<Props>();
const presets = {
  def: "is-flex is-flex-wrap-wrap is-justify-content-space-around is-align-items-stretch",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <BlockControl v-for="blks in blk.$blkss" :blks="blks" :lang="lang" />
  </div>
</template>

<style lang="scss">

</style>
