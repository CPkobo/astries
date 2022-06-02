<script setup lang="ts">
// import BlkControl from "$lib/Block/BlockControl.vue";
import Plain from "$lib/Blocks/Child/Plain.vue"
import List from "$lib/Blocks/Child/List.vue"
import Define from "$lib/Blocks/Child/Define.vue"
import Link from "$lib/Blocks/Child/Link.vue"
import Image from "$lib/Blocks/Child/Image.vue"
import Hd2 from "$lib/Blocks/Child/Headings/Hd2.vue"
import Hd3 from "$lib/Blocks/Child/Headings/Hd3.vue"
import Hd4 from "$lib/Blocks/Child/Headings/Hd4.vue"
import Ih2 from "$lib/Blocks/Child/Headings/Ih2.vue"
import Ih3 from "$lib/Blocks/Child/Headings/Ih3.vue"
import Ih4 from "$lib/Blocks/Child/Headings/Ih4.vue"
import Hero from "$lib/Blocks/Child/Hero/Hero.vue"
import SubHero from "$lib/Blocks/Child/Hero/SubHero.vue"
import SubBar from "$lib/Blocks/Child/Hero/SubBar.vue"
import Relatives from "$lib/Blocks/Child/Relatives/Relatives.vue"
import Spacer from "$lib/Blocks/Child/Spacer.vue";
import Separator from "$lib/Blocks/Child/Separator.vue";

import MediaLeft from "$lib/Blocks/Parent/Media/MediaLeft.vue";
import MediaRight from "$lib/Blocks/Parent/Media/MediaRight.vue";
import Gallary from "$lib/Blocks/Parent/Gallary/Gallary.vue";
import Features from "$lib/Blocks/Parent/Features/Features.vue";
import Horizontal from "$lib/Blocks/Parent/Horizontal/Horizontal.vue";
import Flow from "$lib/Blocks/Parent/Flow/Flow.vue";
import Table from "$lib/Blocks/Parent/Table/Table.vue";
import Faq from '$lib/Blocks/Parent/Faq/Faq.vue'

import Flexlayout from "$lib/Blocks/Ancestor/FlexLayout.vue";
import Columnlayout from "$lib/Blocks/Ancestor/ColumnLayout.vue";

interface Props {
  blks: AnyBlock<IsSingle>[]
}
const props = defineProps<Props>();
const presets = {
  def: "",
};
</script>

<template>
  <div class="block px-5-desktop" v-for="blk in blks">
    <Plain v-if="blk.type === 'plain'" :blk="blk" />
    <List v-else-if="blk.type === 'list'" :blk="blk" />
    <Define v-else-if="blk.type === 'define'" :blk="blk" />
    <Link v-else-if="blk.type === 'link'" :blk="blk" />
    <Image v-else-if="blk.type === 'image'" :blk="blk" />
    <Hd2 v-else-if="blk.type === 'heading 2'" :blk="blk" />
    <Hd3 v-else-if="blk.type === 'heading 3'" :blk="blk" />
    <Hd4 v-else-if="blk.type === 'heading 4'" :blk="blk" />
    <Ih2 v-else-if="blk.type === 'icon heading 2'" :blk="blk" />
    <Ih3 v-else-if="blk.type === 'icon heading 3'" :blk="blk" />
    <Ih4 v-else-if="blk.type === 'icon heading 4'" :blk="blk" />
    <Hero v-else-if="blk.type === 'hero'" :blk="blk" />
    <SubHero v-else-if="blk.type === 'sub hero'" :blk="blk" />
    <SubBar v-else-if="blk.type === 'sub bar'" :blk="blk" />
    <Relatives v-else-if="blk.type === 'relatives'" :blk="blk" />
    <Spacer v-else-if="blk.type === 'spacer'" :blk="blk" />
    <Separator v-else-if="blk.type === 'separator'" :blk="blk" />
    <MediaLeft v-else-if="blk.type === 'Media Left'" :blk="blk" />
    <MediaRight v-else-if="blk.type === 'Media Right'" :blk="blk" />
    <Gallary v-else-if="blk.type === 'Gallary'" :blk="blk" />
    <Features v-else-if="blk.type === 'Features'" :blk="blk" />
    <Horizontal v-else-if="blk.type === 'Horizontal'" :blk="blk" />
    <Flow v-else-if="blk.type === 'Flow'" :blk="blk" />
    <Table v-else-if="blk.type === 'Table'" :blk="blk" />
    <Faq v-else-if="blk.type === 'Faq'" :blk="blk" />
    <Flexlayout v-else-if="blk.type === 'FLEX'" :blk="blk" />
    <Columnlayout v-else-if="blk.type === 'COLUMN'" :blk="blk" />
    <div v-else-if="blk.type === '_'"></div>
    <div v-else>
      <p>Iregular block</p>
    </div>
  </div>
</template>