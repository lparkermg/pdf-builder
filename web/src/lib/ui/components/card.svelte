<script lang="ts">
    import type { MetadataItemModel } from "$lib/internal/models";
    import type { Snippet } from "svelte";


    let {
        selectedId,
        id,
        children
    }:{
        selectedId?: string,
        id: string,
        children: Snippet,
    } = $props()

</script>

<div class={`rounded-xl border bg-card text-card-foreground shadow p-4 cursor-pointer transition-all duration-200 border-2 hover:shadow-md ${
    id === selectedId
    ? 'border-indigo-500 bg-indigo-50/50'
    : 'border-transparent bg-white hover:border-slate-200'
}`}>
    <div class="flex flex-col space-y-1.5 p-6">
        {@render children()}
    </div>
</div>