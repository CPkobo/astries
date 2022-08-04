<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: HeroBlock<IsSingle>
}
const props = defineProps<Props>();
const presets = {
  def: "",
};

const cls = classNaming("hero", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <section :class="cls" id="hero" :style="`background-image: url(${blk.src});`">
    <div class="hero-body">
      <div class="top-title">
        <h1 class="title is-size-1-desktop is-size-2-tablet is-size-3-mobile" v-html="blk.$title" />
        <h2 class="subtitle mt-5 is-size-3-desktop is-size-4-tablet is-size-5-mobile" v-html="blk.$subtitle" />
        <!-- <button v-if="blk.cta">cta</button> -->
      </div>
    </div>
  </section>
</template>

<style lang="scss">
section#hero {
  background-blend-mode: darken;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 8rem;
  display: flex;
  background-color: var(--t-fg);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 25vw;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 80vh;

  div.hero-body {
    min-width: 100vw;

    @media (min-width: 1024px) {
      min-width: 80vw;
    }
  }

  div.top-title {
    vertical-align: middle;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2rem;
  }

  /* div.top-title:hover {
      transition: opacity 0.3s;
      opacity: 0.8;
    } */
}
</style>
