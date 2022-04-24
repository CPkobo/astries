<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: SubHeroBlock<IsSingle>
}
const props = defineProps<Props>();
const presets = {
  def: "",
};

const cls = classNaming("hero", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <section :class="cls" id="sub hero" :style="`background-image: url(${blk.src});`">
    <div class="hero-body">
      <div class="container top-title">
        <h2 class="title top-title is-size-1">{{ blk.$title }}</h2>
      </div>
    </div>
  </section>
</template>

<style scoped>
section#hero {
  background-blend-mode: darken;
  background-size: cover;
  background-repeat: no-repeat;
}
div.top-title {
  vertical-align: middle;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 2rem;
}

/* div.top-title:hover {
    transition: opacity 0.3s;
    opacity: 0.8;
  } */
</style>
