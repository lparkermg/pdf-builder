<script lang="ts">
	import type { CvDocument, DataPair } from "$lib/models/api";
    import type { CvData } from "$lib/models/site";
	import Sidebar from "./Editor/Sidebar.svelte";
    import * as dataapi from "$lib/api/data";
    import * as cvapi from "$lib/api/cv";
	import { page } from "$app/state";
	import { tick } from "svelte";

    interface CvEditorProps {
        apiBase: string,
        id?: string,
    }

    const { apiBase, id }: CvEditorProps = $props()

    let document: CvDocument= $state({
        content: [],
        sidebar: [],
        theme: 0,
        template: 0,
    })

    let currentTheme: number = $state(0)
    let currentTemplate: number = $state(0)
    
    let themes: DataPair[] = $state([])
    let templates: DataPair[] = $state([])

    // TODO: Handle Load etc in here. rather than in the main page.
    async function setupEditor(id: string | undefined){
        const themesResp = await dataapi.getThemes((e) => {}, apiBase, page.url.host)
        const templatesResp = await dataapi.getTemplates((e) => {}, apiBase, page.url.host);

        themes = themesResp.themes;
        templates = templatesResp.templates;
        if(id !== undefined && id !== ""){
            const cv = await cvapi.load((e) => {}, id, apiBase, page.url.host);

            if (cv !== undefined){
                document = cv

                currentTheme = cv?.theme;
                currentTemplate = cv?.template;
            }        
        }
        await tick()
    }

    setupEditor(id);
</script>

<main>
    <Sidebar 
        title="Options"
        themes={themes}
        bind:currentTheme={currentTheme}
        onThemeChanged={(t) => currentTheme = t}
        templates={templates}
        bind:currentTemplate={currentTemplate}
        onTemplateChanged={(t) => currentTemplate = t}
        />
        <section></section>
</main>