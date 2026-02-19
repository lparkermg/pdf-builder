<script lang="ts">
    let { children } = $props();
</script>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {@render children?.()}
</div>