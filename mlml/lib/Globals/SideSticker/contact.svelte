<script lang="ts">
  import { prof } from "../../../stores/profile";
  import FilledBar from "../lib/Utils/filledBar.svelte";
  import ContactButton from "../lib/CTAs/contact.svelte";
</script>

<aside class="stick-contact has-text-centered pb-3">
  <FilledBar title="いつでもご連絡ください" />
  <ul class="mb-4 list-contacts">
    <li class="is-size-4-desktop is-size-6-touch">
      <span class="icon mr-1">
        <i class="fa fa-phone" aria-hidden="true" />
      </span>{$prof.Tel}
    </li>
    <li class="is-size-4-desktop is-size-6-touch">
      <span class="icon mr-1">
        <i class="fa fa-envelope" aria-hidden="true" />
      </span>
      <a href="mailto:{$prof.Email}">{$prof.Email}</a>
    </li>
  </ul>
  <ContactButton />
</aside>

<style lang="scss">
</style>
