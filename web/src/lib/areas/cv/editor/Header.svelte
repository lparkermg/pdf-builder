<script lang="ts">
    import type { DataPairModel } from "$lib/internal/models";
    import { Button } from "bits-ui";
    import { Save } from "lucide-svelte";

    let {
        title,
        canSave,
        selectedTheme,
        selectedTemplate,
        themes,
        templates,
        onTitleChanged,
        onSaveClicked,
        onThemeChanged,
        onTemplateChanged
    }:{
        title: String;
        canSave: boolean;
        selectedTheme: number;
        selectedTemplate: number;
        themes: DataPairModel[];
        templates: DataPairModel[];
        onTitleChanged: (newTitle: string) => void;
        onSaveClicked: () => void;
        onThemeChanged: (newTheme: number) => void;
        onTemplateChanged: (newTemplate: number) => void;
    } = $props()
</script>
<div class="flex items-center gap-3 mb-2">
    <input
        class="w-full text-lg font-medium border-0 bg-slate-100 focus:bg-white transition-colors h-12 rounded-xl" 
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
<div class="flex items-center justify-start gap-3 mb-4">
    <label for="template-select">Template:</label>
    <select
        id="template-select"
        class="w-full text-lg font-medium border-0 bg-slate-100 focus:bg-white transition-colors h-12 rounded-xl"
        value={selectedTemplate} 
        onchange={(e) => onTemplateChanged(Number(e.currentTarget.value))}>
        {#each templates as template}
            <option value={template.id}>{template.display}</option>
        {/each}
    </select>
    <label for="theme-select">Theme:</label>
    <select
        id="theme-select"
        class="w-full text-lg font-medium border-0 bg-slate-100 focus:bg-white transition-colors h-12 rounded-xl"
        value={selectedTheme}
        onchange={(e) => onThemeChanged(Number(e.currentTarget.value))}>
        {#each themes as theme}
            <option value={theme.id}>{theme.display}</option>
        {/each}
    </select>
</div>