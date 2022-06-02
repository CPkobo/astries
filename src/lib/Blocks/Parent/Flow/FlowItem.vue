<script setup lang="ts">
import BlockControl from "$lib/Blocks/BlockControl.vue"
interface Props {
  itm: FlowItem<IsSingle>;
  order: number;
}
const props = defineProps<Props>();
</script>

<template>
  <div class="flow-box">
    <div class="flow-order">
      <p class="is-size-4">{{ order }}</p>
    </div>
    <div class="flow-text">
      <BlockControl :blks="itm.$blks" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors" as c;
div.flow-box {
  display: flex;
}

div.flow-order {
  width: 5rem;
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  background-color: c.$primary-nega;
  color: c.$primary-nega-text;
  flex-grow: 0;
}

div.flow-text {
  width: 100%;
  padding: 1rem;
  flex-grow: 1;
}
</style>
