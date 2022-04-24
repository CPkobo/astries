<script setup lang="ts">
import { classNaming } from "$scripts/_className"
import BlockControl from "$lib/Blocks/BlockControl.vue"
// import TableHead from "./TableHead.astro"
// import TableRow from "./TableRow.astro"
interface Props {
  blk: TableBlock<IsSingle>
}
const props = defineProps<Props>();
const presets = {
  def: "",
};

const cls = classNaming("", props.blk.classes, props.blk.preset, presets)
// console.log(blk)
</script>

<template>
  <table :id="blk.id" :class="`${cls} table is-fullwidth is-striped is-hoverable`">
    <thead v-if="blk.$th">
      <tr>
        <th v-for="hc in blk.$th">{{ hc }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in blk.$trs">
        <td v-for="cell in row">
          <BlockControl :blks="[cell]" />
        </td>
      </tr>
    </tbody>
  </table>
</template>