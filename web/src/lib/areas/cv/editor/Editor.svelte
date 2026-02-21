<script lang="ts">
    import { Accordion, Button, Separator } from "bits-ui";
    import Header from "./Header.svelte";
    import type { CvModel, DataPairModel } from "$lib/internal/models";
    import GridContent from "$lib/areas/GridContent.svelte";
    import { Plus, Trash } from "lucide-svelte";
    import SectionHeader from "./section/SectionHeader.svelte";
    import { CV_EVENTS } from "$lib/internal/constants";
    import Section from "./section/Section.svelte";
    let {
        cv,
        title,
        themes,
        templates
    }:{
        cv: CvModel
        title: string
        themes: DataPairModel[],
        templates: DataPairModel[],
    } = $props();

    function onTitleUpdated(newTitle: string){
        window.dispatchEvent(new CustomEvent(CV_EVENTS.CV_TITLE_UPDATED, { detail: { newTitle }}))
    }

    function onSettingsChanged(type: string, newSetting: number){
        window.dispatchEvent(new CustomEvent(CV_EVENTS.CV_SETTING_CHANGED, { detail: { type, newSetting }}))
    }

    function onSaveClicked(){
        window.dispatchEvent(new Event(CV_EVENTS.SAVE_CV))
    }

    function onContentUpdated(type: string, sectionId: number, newContent: string) {
        window.dispatchEvent(new CustomEvent(CV_EVENTS.CV_SECTION_UPDATED, { detail: { type, sectionId, newContent }}))
    }

    function onSectionRemoved(type: string, sectionId: number){
        window.dispatchEvent(new CustomEvent(CV_EVENTS.CV_SECTION_REMOVED, { detail: { type, sectionId }}))
    }

    function onSectionAdded(type: string){
        window.dispatchEvent(new CustomEvent(CV_EVENTS.CV_SECTION_ADDED, { detail: { type }}))
    }
</script>
<div class="lg:col-span-8 xl:col-span-9">
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 min-h-[300px]">
        <div class="h-full flex flex-col">
            <Header 
                title={title}
                canSave={title.trim() !== ""}
                themes={themes}
                templates={templates}
                selectedTheme={cv.theme}
                selectedTemplate={cv.template}
                onTitleChanged={(e) => onTitleUpdated(e)}
                onSaveClicked={onSaveClicked}
                onThemeChanged={(e) => onSettingsChanged("theme", e)}
                onTemplateChanged={(e) => onSettingsChanged("template", e)}    
            />
            <Separator.Root
                class="bg-gradient-to-r from-slate-100 to-slate-300 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
            />
            <div class="h-full flex flex-col pt-2 pb-2">
                <SectionHeader title="Sidebar Sections">
                    <Button.Root
                        class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 ${
                                "hover:bg-accent hover:text-accent-foreground text-slate-400 hover:text-indigo-600"
                            }`}
                        onclick={() => onSectionAdded("sidebar")}
                    >
                        <Plus />
                    </Button.Root>
                </SectionHeader>
                {#each cv.sidebar as sidebar, index}
                    <div class="rounded-xl border bg-card text-card-foreground shadow p-2 cursor-pointer transition-all duration-200 border-2 hover:shadow-md border-transparent bg-white hover:border-slate-200">
                    <Section
                        content={sidebar}
                        onContentChanged={(e:string) => onContentUpdated("sidebar", index, e)}
                        onRemoveContentClicked={() => onSectionRemoved("sidebar", index)}
                    />
                    </div>
                {/each}
            </div>

            <Separator.Root
                class="bg-gradient-to-r from-slate-100 to-slate-300 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
            />
            <div class="h-full flex flex-col pt-2 pb-2">
                <SectionHeader title="Main Sections">
                    <Button.Root
                        class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 ${
                                "hover:bg-accent hover:text-accent-foreground text-slate-400 hover:text-indigo-600"
                            }`}
                        onclick={() => onSectionAdded("main")}
                    >
                        <Plus />
                    </Button.Root>
                </SectionHeader>
                {#each cv.content as content, index}
                    <div class="rounded-xl border bg-card text-card-foreground shadow p-4 cursor-pointer transition-all duration-200 border-2 hover:shadow-md border-transparent bg-white hover:border-slate-200">
                    <Section 
                        content={content}
                        onContentChanged={(e:string) => onContentUpdated("main", index, e)}
                        onRemoveContentClicked={() => onSectionRemoved("main", index)}
                    />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>