<script setup lang="ts">
import BlockControl from "$lib/Blocks/BlockControl.vue"
interface Props {
  qa: QuestionAndAnser<IsSingle>;
  order: number;
  qaid: string;
}
const props = defineProps<Props>();

const slag = props.qa.slag
  ? props.qaid !== ''
    ? `${props.qaid}-${props.qa.slag.replace(' ', '-')}`
    : props.qa.slag.replace(' ', '-')
  : `${props.qaid}-${props.order}`
</script>

<template>
  <div class="box" :id="slag">
    <div class="faq-question-box">
      <div class="faq-question-order">
        <p class="is-size-4">Q.</p>
      </div>
      <div class="faq-question-text">
        <BlockControl :blks="qa.$q" />
      </div>
    </div>
    <hr style="height: 1rem;" />
    <div class="faq-answer-box">
      <div class="faq-answer-order">
        <p class="is-size-4">A.</p>
      </div>
      <div class="faq-answer-text">
        <BlockControl :blks="qa.$a" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../../../styles/colors" as c;

.faq-question-box {
  display: flex;
}

.faq-question-order {
  width: 50px;
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  background-color: c.$primary-nega;
  color: c.$primary-nega-text;
  flex-grow: 0;
}

.faq-question-text {
  padding: 1rem;
}
.faq-answer-box {
  display: flex;
}

.faq-answer-order {
  width: 50px;
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  background-color: c.$secondary-nega;
  color: c.$secondary-nega-text;
  flex-grow: 0;
}

.faq-answer-text {
  padding: 1rem;
}
</style>
