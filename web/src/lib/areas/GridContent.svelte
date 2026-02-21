<script lang="ts">
    import type { Snippet } from "svelte";

    let { 
        children, 
        otherClasses
    }:{
        children?: Snippet,
        otherClasses?: string
    } = $props();
</script>
<div class={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${otherClasses}`}>
    {@render children?.()}
</div>