<script lang="ts">
    import GridContent from "$lib/areas/GridContent.svelte";
    import { Trash } from "lucide-svelte";

    let {
        content,
        onContentChanged,
        onRemoveContentClicked,
    }:{
        content: string;
        onContentChanged: (newContent: string) => void;
        onRemoveContentClicked: () => void;
    } = $props()
</script>

<GridContent>
    <textarea
        class="col-span-11 w-full font-small border-0 bg-slate-100 focus:bg-white transition-colors h-12 rounded-xl min-h-[200px]" 
        placeholder="Enter content here..."
        value={content}
        onchange={(e) => onContentChanged(e.currentTarget.value as string)}
    ></textarea>
    <button class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
        "hover:bg-accent hover:text-accent-foreground h-12 w-12 text-slate-400 hover:text-red-600"
        }`}
            onclick={onRemoveContentClicked}    
    >
        <Trash class="w-10 h-10" />
    </button>
</GridContent>