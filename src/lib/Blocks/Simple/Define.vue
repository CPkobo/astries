<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: DefineBlock<IsSingle>
}
const props = defineProps<Props>();

const presets = {
  def: "px-3",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
</script>

<template>
  <div class="content">
    <dl :id="blk.id" :class="cls">
      <template v-for="item in blk.$texts">
        <dt>{{ item[0] }}</dt>  
        <dd v-for="dts in item.slice(1)">{{ dts }}</dd>
      </template>
    </dl>
  </div>
</template>