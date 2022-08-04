<script setup lang="ts">
import { ref } from 'vue'
import { classNaming } from "$scripts/_className"
import Hero from "$lib/Blocks/Child/Hero/Hero.vue"
import SubHero from "$lib/Blocks/Child/Hero/SubHero.vue"
import { tsThisType } from '@babel/types';
interface Props {
  blk: SlideHero<IsSingle>
}
const props = defineProps<Props>();
const presets = {
  def: "",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)

const c = ref(9)

const hoge = () => {
  c.value++
}

// setInterval(activate, 500)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      active: 0,
      max: 0
    }
  },
  mounted() {
    this.max = this.blk.$blks.length
    setInterval(this.roll, 1000)
  },
  methods: {
    roll() {
      if (this.active >= this.max) {
        this.active = 0
      }
      else {
        this.active++
      }
      console.log(this.active)
    },
    yes() {
      this.active++
    }
  }
})
</script>


<template>
  <div v-for="($blk, idx) in blk.$blks" :class="{ displaying: active === idx, hiding: active !== idx }">
    <Hero :blk="$blk" />
    <button v-on:click="() => { console.log('a') }">a</button>
    <button @click="hoge">{{ c }}</button>
  </div>
</template>

<style lang="scss" scoped>
.displaying {
  display: block
}

.hiding {
  display: none;
}
</style>
