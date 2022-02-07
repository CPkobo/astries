<script lang="ts">
  export let caption = ''
  export let href = ''
</script>

<div class="card">
  <div class="card-content">
    <div class="content">
      <h4 class="is-4">
        <a {href}>{caption} &gt;&gt;</a>
      </h4>
    </div>
  </div>
</div>