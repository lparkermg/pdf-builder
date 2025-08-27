<script lang="ts">
	import type { CvDocument, DataPair, CvRequest } from "$lib/models/api";
    import type { CvData } from "$lib/models/site";
	import Sidebar from "./Editor/Sidebar.svelte";
    import * as dataapi from "$lib/api/data";
    import * as cvapi from "$lib/api/cv";
	import { page } from "$app/state";
	import { tick } from "svelte";
	import NavBar from "./Editor/NavBar.svelte";
	import ContentSection from "./Editor/ContentSection.svelte";

    interface CvEditorProps {
        apiBase: string,
        id?: string,
    }

    const { apiBase, id }: CvEditorProps = $props()

    let document: CvDocument= $state({
        title: "",
        content: [],
        sidebar: [],
        theme: 0,
        template: 0,
    })

    let loading: boolean = $state(true)

    let currentId: string | undefined = $state(id)

    let currentTitle: string = $state("")
    let currentTheme: number = $state(0)
    let currentTemplate: number = $state(0)

    let currentContentSections: string[] = $state([])
    let currentSidebarSections: string[] = $state([])
    
    let themes: DataPair[] = $state([])
    let templates: DataPair[] = $state([])

    async function setupEditor(id: string | undefined){
        loading = true;
        await tick()
        const themesResp = await dataapi.getThemes((e) => {}, apiBase, page.url.host)
        const templatesResp = await dataapi.getTemplates((e) => {}, apiBase, page.url.host);

        themes = themesResp.themes;
        templates = templatesResp.templates;
        if(currentId !== undefined && currentId !== ""){
            const cv = await cvapi.load((e) => {}, currentId, apiBase, page.url.host);

            if (cv !== undefined){
                document = cv

                currentTitle = cv?.title

                currentTheme = cv?.theme;
                currentTemplate = cv?.template;

                currentSidebarSections = cv?.sidebar
                currentContentSections = cv?.content
            }        
        }
        loading = false;
        await tick()
    }

    async function updateTitle(newTitle: string) {
        document.title = newTitle
        currentTitle = newTitle
    }

    async function addContentSection(addingSidebar: boolean){
        if(addingSidebar){
            currentSidebarSections.push("");
        }
        else {
            currentContentSections.push("")
        }
    }

    async function updateContentSection(sectionIndex: number, newContent: string, isSidebar: boolean) {
        if (isSidebar){
            currentSidebarSections[sectionIndex] = newContent
        }
        else{
            currentContentSections[sectionIndex] = newContent
        }
    }

    async function removeSection(sectionIndex: number, isSidebar: boolean) {
        if (isSidebar){
            currentSidebarSections.splice(sectionIndex, 1)
        }
        else {
            currentContentSections.splice(sectionIndex, 1)
        }
    }

    async function saveChanges(){
        loading = true;
        await tick();

        document.title = currentTitle;
        document.theme = currentTheme;
        document.template = currentTemplate;
        document.sidebar = currentSidebarSections;
        document.content = currentContentSections;

        const newId = await cvapi.save((e) => {}, currentId, currentTitle, document, apiBase, page.url.host);

        if (newId !== "" && (currentId === undefined || currentId === "")){
            currentId = newId
        }

        loading = false
        await tick()
    }

    async function generateCv() {
        loading = true;
        await tick()

        const resp = await cvapi.generate((e) => {}, {
            template: currentTemplate,
            theme: currentTheme,
            content: currentContentSections,
            sidebar: currentSidebarSections
        }, apiBase, page.url.host)

        loading = false
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
        <section>
            <NavBar
                canInteract={!loading}
                bind:fileTitleValue={currentTitle}
                onFileTitleChanged={v => updateTitle(v)}
                onSave={saveChanges}
                onGenerate={generateCv}
                 />
                 <div class="content-nav">
                    <strong>
                        Sidebar
                    </strong>
                    <button class="btn-positive" onclick={() => addContentSection(true)}>
                        <strong>+</strong>
                    </button>
                </div>
                 {#each currentSidebarSections as section, i}
                    <ContentSection content={section} onContentChanged={n => updateContentSection(i, n, true)} onRemoveClicked={() => removeSection(i, true)} />
                 {/each}
                 <div class="content-nav">
                    <strong>
                        Main Area
                    </strong>
                    <button class="btn-positive" onclick={() => addContentSection(false)}>
                        <strong>+</strong>
                    </button>
                </div>
                 {#each currentContentSections as section, i}
                    <ContentSection content={section} onContentChanged={(n) => updateContentSection(i, n, false)} onRemoveClicked={() => removeSection(i, false)} />
                 {/each}
        </section>
</main>