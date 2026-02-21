<script lang="ts">
    import { Accordion, Button, Separator } from "bits-ui";
    import Header from "./Header.svelte";
    import type { CvModel } from "$lib/internal/models";
    import GridContent from "$lib/areas/GridContent.svelte";
    import { Plus, Trash } from "lucide-svelte";
    import SectionHeader from "./section/SectionHeader.svelte";
    import { CV_EVENTS } from "$lib/internal/constants";
    let {
        cv,
        title
    }:{
        cv: CvModel | undefined
        title: string
    } = $props();

    function onTitleUpdated(newTitle: string){
        window.dispatchEvent(new CustomEvent(CV_EVENTS.CV_TITLE_UPDATED, { detail: { newTitle }}))
    }

    function onSaveClicked(){
        window.dispatchEvent(new Event(CV_EVENTS.SAVE_CV))
    }
</script>
<div class="lg:col-span-8 xl:col-span-9">
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 min-h-[300px]">
        <div class="h-full flex flex-col">
            <Header title={title} canSave={title.trim() !== ""} onTitleChanged={(e) => onTitleUpdated(e)} onSaveClicked={onSaveClicked}/>
            <Separator.Root
                class="bg-gradient-to-r from-slate-100 to-slate-300 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
            />
            <div class="h-full flex flex-col pt-2 pb-2">
                <SectionHeader title="Sidebar Sections">
                    <Button.Root
                        class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 ${
                                "hover:bg-accent hover:text-accent-foreground text-slate-400 hover:text-indigo-600"
                            }`}
                    >
                        <Plus />
                    </Button.Root>
                </SectionHeader>
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
                    >
                        <Plus />
                    </Button.Root>
                </SectionHeader>
            </div>
        </div>
    </div>
</div>