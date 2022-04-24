<script setup lang="ts">
import BlockControl from "$lib/Blocks/BlockControl.vue"
import DefImg from "$lib/Util/DefImg.vue"
interface Props {
  itm: HorizontalItem<IsSingle>,
  size: string
}
const props = defineProps<Props>();
</script>

<template>
  <div :class="size">
    <div class="card horizontal-card">
      <div class="card-image">
        <figure class="image is-4by4">
          <img v-if="itm.img" :src="itm.img" :alt="itm.$title" />
          <DefImg v-else />
        </figure>
      </div>
      <div class="card-content">
        <div class="media-content px-3">
          <p class="title is-4">{{ itm.$title }}</p>
        </div>
      </div>
      <div class="content">
        <BlockControl :blks="itm.$blks" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-card {
  background-color: rgba(220, 220, 220, 0.5);
}
</style>
