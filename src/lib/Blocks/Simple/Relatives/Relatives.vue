<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: RelativeBlock<IsSingle>
}
const props = defineProps<Props>();
const presets = {
  def: "px-3",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
const title = props.blk.$title ? props.blk.$title : "Relating...";
</script>

<template>
  <div :id="blk.id" :class="cls">
    <h4 class="title is-5">{{ title }}</h4>
    <template v-for="art in blk.$articles">
      <div class="box article-box">
        <img class="image" :src="art.src" :alt="art.$alt" />
        <div>
          <h5>{{ art.$title }}</h5>
          <p>{{ art.$description }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  div.article-box {
    display: flex;
  }

  div.article-box div {
    flex-grow: 1;
    padding: 1rem;
  }

  div.article-box img {
    flex-grow: 0;
    max-width: 30%;
  }
}
</style>
