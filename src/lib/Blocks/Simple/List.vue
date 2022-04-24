<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: ListBlock<IsSingle>
}
const props = defineProps<Props>();


const presets = {
  def: "",
  circle: "list-circled",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div class="content">
    <ul :id="blk.id" :class="cls">
      <li v-for="t in blk.$texts">{{ t }}</li>
    </ul>
  </div>
</template>
