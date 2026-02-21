<script lang="ts">
    import { Button } from "bits-ui";
    import { Save } from "lucide-svelte";

    let {
        title,
        canSave,
        onTitleChanged,
        onSaveClicked
    }:{
        title: String;
        canSave: boolean;
        onTitleChanged: (newTitle: string) => void;
        onSaveClicked: () => void;
    } = $props()
</script>
<div class="flex items-center gap-3 mb-4">
    <input
        class="w-full text-lg font-medium border-0 bg-slate-50 focus:bg-white transition-colors h-12 rounded-xl" 
        placeholder="CV Title..." 
        value={title}
        onchange={(e) => onTitleChanged(e.currentTarget.value)} 
    />
    <Button.Root
        class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 ${
                                "hover:bg-accent hover:text-accent-foreground text-slate-400 hover:text-indigo-600"
                            }`}
        disabled={!canSave}
        onclick={onSaveClicked}
        >
        <Save />    
    </Button.Root>   
</div>