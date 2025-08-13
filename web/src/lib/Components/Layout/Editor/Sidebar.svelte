<script lang="ts">
	import type { DataPair } from "$lib/models/api";

    interface SidebarProps {
        title: string
        themes: DataPair[],
        currentTheme: number
        templates: DataPair[],
        currentTemplate: number,
        onThemeChanged:(newTheme: number) => void,
        onTemplateChanged: (newTemplate: number) => void, 
    }

    let {
        title,
        themes,
        currentTheme = $bindable(),
        onThemeChanged,
        templates,
        currentTemplate = $bindable(),
        onTemplateChanged,
    }: SidebarProps = $props()
</script>

<aside class="sidebar">
    <h2>{title}</h2>
    <label for="theme">
        <span>Theme</span>
        <select id="theme" bind:value={currentTheme} onchange={e => onThemeChanged(Number(e.currentTarget.value))}>
            {#each themes as theme}
                <option value={theme.id}>{theme.name}</option>
            {/each}
        </select>
    </label>
    <label for="template">
        <span>Template</span>
        <select id="template" bind:value={currentTemplate} onchange={e => onTemplateChanged(Number(e.currentTarget.value))}>
            {#each templates as template}
                <option value={template.id}>{template.name}</option>
            {/each}
        </select>
    </label>
</aside>

