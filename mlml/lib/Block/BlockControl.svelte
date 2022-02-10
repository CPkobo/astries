<script lang="ts">
  import { onMount } from "svelte";

  import Plain from "./Simple/Plain.svelte";
  import List from "./Simple/List.svelte";
  import Define from "./Simple/Define.svelte";
  import Link from "./Simple/Link.svelte";
  import Image from "./Simple/Image.svelte";

  import Hero from "./Simple/Hero/Hero.svelte";
  import SubHero from "./Simple/Hero/Subhero.svelte";
  import SubBar from "./Simple/Hero/Subbar.svelte";

  import Hd2 from "./Simple/Headings/Hd2.svelte";
  import Hd3 from "./Simple/Headings/Hd3.svelte";
  import Hd4 from "./Simple/Headings/Hd4.svelte";
  import Ih2 from "./Simple/Headings/Ih2.svelte";
  import Ih3 from "./Simple/Headings/Ih3.svelte";
  import Ih4 from "./Simple/Headings/Ih4.svelte";

  import Relatives from "./Simple/Relatives/Relatives.svelte";
  import Spacer from "./Simple/Spacer.svelte";
  import Separator from "./Simple/Separator.svelte";

  import MediaLeft from "./Complex/Media/MediaLeft.svelte";
  import MediaRight from "./Complex/Media/MediaRight.svelte";
  import Gallary from "./Complex/Gallary/Gallary.svelte";
  import Features from "./Complex/Features/Features.svelte";
  import Horizontal from "./Complex/Horizontal/Horizontal.svelte";
  import Flows from "./Complex/Flow/Flow.svelte";
  import Table from "./Complex/Table/Table.svelte";

  import Flexlayout from "./Layout/FlexLayout.svelte";
  import Columnlayout from "./Layout/ColumnLayout.svelte";

  export let blks: AnyBlock<IsSingle>[];

  const delay = 250;
</script>

<!-- <section class="section"> -->
<div class="contents px-5-desktop">
  {#each blks as blk, idx}
    {#if blk.type === "Heading 2"}
      <Hd2 {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Heading 3"}
      <Hd3 {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Heading 4"}
      <Hd4 {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Icon Heading 2"}
      <Ih2 {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Icon Heading 3"}
      <Ih3 {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Icon Heading 4"}
      <Ih4 {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Plain"}
      <Plain {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Link"}
      <Link {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Image"}
      <Image {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "List"}
      <List {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Define"}
      <Define {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Hero"}
      <Hero {blk} />
    {:else if blk.type === "Sub Hero"}
      <SubHero {blk} />
    {:else if blk.type === "Sub Bar"}
      <SubBar {blk} />
    {:else if blk.type === "Media Right"}
      <MediaRight {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Media Left"}
      <MediaLeft {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Gallary"}
      <Gallary {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Features"}
      <Features {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Horizontal"}
      <Horizontal {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Flow"}
      <Flows {blk} />
    {:else if blk.type === "Table"}
      <Table {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "Spacer"}
      <Spacer {blk} />
    {:else if blk.type === "Separator"}
      <Separator dtime={(idx + 1) * delay} />
    {:else if blk.type === "RawHTML"}
      {@html blk.$html}
    {:else if blk.type === "Relatives"}
      <Relatives {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "FLEX"}
      <Flexlayout {blk} dtime={(idx + 1) * delay} />
    {:else if blk.type === "COLUMN"}
      <Columnlayout {blk} dtime={(idx + 1) * delay} />
    {/if}
  {/each}
</div>
<!-- </section> -->
