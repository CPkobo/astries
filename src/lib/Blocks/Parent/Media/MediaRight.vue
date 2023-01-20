<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import BlockControl from "$lib/Blocks/BlockControl.vue"
interface Props {
  blk: MediaTextBlock<IsSingle>
  lang: LangList
}
const props = defineProps<Props>();

const presets = {
  def: "",
};

const cls = classNaming("img-box box", props.blk.classes, props.blk.preset, presets)
</script>


<template>
  <div :id="blk.id" :class="cls">
    <div class="columns">
      <div class="column is-two-thirds ml-2-desktop pr-5-desktop">
        <BlockControl :blks="blk.$blks" :lang="lang" />
      </div>
      <div class="column is-one-third has-text-centered">
        <img :src="blk.src" :alt="blk.$alt" class="img-box-fig" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  div.img-box {
    display: flex;
  }

  div.img-box div {
    flex-grow: 1;
  }

  div.img-box img {
    flex-grow: 0;
  }
}
</style>
