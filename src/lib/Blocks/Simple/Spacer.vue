<script setup lang="ts">
import { classNaming } from "$scripts/_className"
interface Props {
  blk: Spacer
}
const props = defineProps<Props>();

const mx =
  props.blk.x === undefined || props.blk.x === 0 || props.blk.x > 6 ? "" : `mx-${props.blk.x}`;
const my =
  props.blk.y === undefined || props.blk.y === 0 || props.blk.y > 6 ? "" : `my-${props.blk.y}`;

const cls = classNaming("", props.blk.classes, props.blk.preset, null)
</script>

<div :id="props.blk.id" :class="`${mx} ${my} ${props.blk.classes}`" />
