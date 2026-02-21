<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        title,
        children
    }:{
        title:string
        children?: Snippet
    } = $props()
</script>

<div class="flex items-center gap-3 mb-4">
    <h1 class="w-full text-lg">{title}</h1>
    <div class="flex items-center gap-2">
        {@render children?.()}
    </div>
</div>