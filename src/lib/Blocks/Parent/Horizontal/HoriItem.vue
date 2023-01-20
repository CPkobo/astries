<script setup lang="ts">
import BlockControl from "$lib/Blocks/BlockControl.vue"
import DefImg from "$lib/Util/DefImg.vue"
interface Props {
  itm: HorizontalItem<IsSingle>;
  size: string;
  lang: LangList;
}
const props = defineProps<Props>();
</script>

<template>
  <div :class="size">
    <div class="card horizontal-card mx-2">
      <div class="card-image">
        <a v-if="itm.link" :href="itm.link">
          <figure class="image is-4by4">
            <img v-if="itm.img" :src="itm.img" :alt="itm.$title" />
            <DefImg v-else />
          </figure>
        </a>
        <figure v-else class="image is-4by4">
          <img v-if="itm.img" :src="itm.img" :alt="itm.$title" />
          <DefImg v-else />
        </figure>
      </div>
      <div class="card-content has-text-centered" v-if="itm.$title !== ''">
        <div class="media-content px-3">
          <a v-if="itm.link" :href="itm.link">
            <p class="is-5-desktop is-6-mobile">{{ itm.$title }}</p>
          </a>
          <p v-else class="is-5-desktop is-6-mobile">{{ itm.$title }}</p>
        </div>
      </div>
      <div class="content">
        <BlockControl :blks="itm.$blks" :lang="lang" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-card {
  background-color: rgba(220, 220, 220, 0.5);
}
</style>
