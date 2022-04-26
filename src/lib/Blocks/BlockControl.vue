<script setup lang="ts">
// import BlkControl from "$lib/Block/BlockControl.vue";
import Plain from "$lib/Blocks/Simple/Plain.vue"
import List from "$lib/Blocks/Simple/List.vue"
import Define from "$lib/Blocks/Simple/Define.vue"
import Link from "$lib/Blocks/Simple/Link.vue"
import Image from "$lib/Blocks/Simple/Image.vue"
import Hd2 from "$lib/Blocks/Simple/Headings/Hd2.vue"
import Hd3 from "$lib/Blocks/Simple/Headings/Hd3.vue"
import Hd4 from "$lib/Blocks/Simple/Headings/Hd4.vue"
import Ih2 from "$lib/Blocks/Simple/Headings/Ih2.vue"
import Ih3 from "$lib/Blocks/Simple/Headings/Ih3.vue"
import Ih4 from "$lib/Blocks/Simple/Headings/Ih4.vue"
import Hero from "$lib/Blocks/Simple/Hero/Hero.vue"
import SubHero from "$lib/Blocks/Simple/Hero/SubHero.vue"
import SubBar from "$lib/Blocks/Simple/Hero/SubBar.vue"
import Relatives from "$lib/Blocks/Simple/Relatives/Relatives.vue"
import Spacer from "$lib/Blocks/Simple/Spacer.vue";
import Separator from "$lib/Blocks/Simple/Separator.vue";

import MediaLeft from "$lib/Blocks/Complex/Media/MediaLeft.vue";
import MediaRight from "$lib/Blocks/Complex/Media/MediaRight.vue";
import Gallary from "./Complex/Gallary/Gallary.vue";
import Features from "./Complex/Features/Features.vue";
import Horizontal from "./Complex/Horizontal/Horizontal.vue";
import Flow from "./Complex/Flow/Flow.vue";
import Table from "./Complex/Table/Table.vue";

import Flexlayout from "./Layout/FlexLayout.vue";
import Columnlayout from "./Layout/ColumnLayout.vue";

interface Props {
  // blks: AnyBlock<IsSingle>[]
  blks: Array<SimpleBlock<IsSingle> | ComplexBlock<IsSingle> | LayoutBlock<IsSingle>>
}
const props = defineProps<Props>();
const presets = {
  def: "",
};
</script>

<template>
  <div class="contents px-5-desktop" v-for="blk in blks">
    <Plain v-if="blk.type === 'Plain'" :blk="blk" />
    <List v-else-if="blk.type === 'List'" :blk="blk" />
    <Define v-else-if="blk.type === 'Define'" :blk="blk" />
    <Link v-else-if="blk.type === 'Link'" :blk="blk" />
    <Image v-else-if="blk.type === 'Image'" :blk="blk" />
    <Hd2 v-else-if="blk.type === 'Heading 2'" :blk="blk" />
    <Hd3 v-else-if="blk.type === 'Heading 3'" :blk="blk" />
    <Hd4 v-else-if="blk.type === 'Heading 4'" :blk="blk" />
    <Ih2 v-else-if="blk.type === 'Icon Heading 2'" :blk="blk" />
    <Ih3 v-else-if="blk.type === 'Icon Heading 3'" :blk="blk" />
    <Ih4 v-else-if="blk.type === 'Icon Heading 4'" :blk="blk" />
    <Hero v-else-if="blk.type === 'Hero'" :blk="blk" />
    <SubHero v-else-if="blk.type === 'Sub Hero'" :blk="blk" />
    <SubBar v-else-if="blk.type === 'Sub Bar'" :blk="blk" />
    <Relatives v-else-if="blk.type === 'Relatives'" :blk="blk" />
    <Spacer v-else-if="blk.type === 'Spacer'" :blk="blk" />
    <Separator v-else-if="blk.type === 'Separator'" :blk="blk" />
    <MediaLeft v-else-if="blk.type === 'Media Left'" :blk="blk" />
    <MediaRight v-else-if="blk.type === 'Media Right'" :blk="blk" />
    <Gallary v-else-if="blk.type === 'Gallary'" :blk="blk" />
    <Features v-else-if="blk.type === 'Features'" :blk="blk" />
    <Horizontal v-else-if="blk.type === 'Horizontal'" :blk="blk" />
    <Flow v-else-if="blk.type === 'Flow'" :blk="blk" />
    <Table v-else-if="blk.type === 'Table'" :blk="blk" />
    <Flexlayout v-else-if="blk.type === 'FLEX'" :blk="blk" />
    <Columnlayout v-else-if="blk.type === 'COLUMN'" :blk="blk" />
    <div v-else>
      <p>Iregular block</p>
    </div>
  </div>
</template>