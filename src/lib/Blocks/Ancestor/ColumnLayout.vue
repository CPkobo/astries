<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import BlockControl from "$lib/Blocks/BlockControl.vue"
interface Props {
  blk: ColumnLayout<IsSingle>
  lang: LangList
}
const props = defineProps<Props>();

const presets = {
  def: "",
};

const cls = classNaming("columns", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div :id="blk.id" :class="cls">
    <div class="column" v-for="blks in blk.$blkss">
      <BlockControl :blks="blks" :lang="lang" />
    </div>
  </div>
</template>

<style lang="scss">

</style>
