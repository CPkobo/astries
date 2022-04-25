<script setup lang="ts">
import BlockControl from "$lib/Blocks/BlockControl.vue"
interface Props {
  itm: FeaturesItem<IsSingle>
}
const props = defineProps<Props>();
</script>

<template>
  <div class="feature-box">
    <a :href="itm.link">
      <h4 class="is-size-4 pl-3">
        <span v-if="itm.icon" class="icon is-large fa-2x mr-2">
          <i :class="itm.icon" aria-hidden="true"></i>
        </span>
        {{ itm.$title }}
      </h4>
      <BlockControl :blks="itm.$blks" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors" as c;
h4 {
  color: c.$primary;
  border-bottom: dotted 2px c.$primary;
}

div.feature-box {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 3rem;

  a {
    color: c.$text-color;
  }

  &:hover {
    background-color: c.$accent;
    color: c.$accent-nega-text;
    transition: 0.5s;
  }
  @media (min-width: 1024px) {
    width: calc(100% - 2rem * 1);
    max-width: calc(50% - 2rem * 2);
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
