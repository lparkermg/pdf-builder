<script lang="ts">
    import type { MetadataItemModel } from "$lib/internal/models";
    import Card from "$lib/ui/components/card.svelte";
    import { Clock, Pencil, Trash } from "lucide-svelte";
    import { format } from "date-fns";
    import { CV_EVENTS } from "$lib/internal/constants";

    let {
        title,
        cvs,
        selectedId
    }: {
        title: string,
        cvs: MetadataItemModel[]
        selectedId?: string
    } = $props();

    function sendMessage(messageType: string, id: string){
        window.dispatchEvent(new CustomEvent(messageType, { detail: { id }}))
    }
</script>
<div class="lg:col-span-4 xl:col-span-3">
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-200/50">
        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <span class="text-sm font-medium text-slate-600">{title}</span>
            <span class="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{cvs.length}</span>
        </div>
        <div class="space-y-2">
            {#each cvs as cv}
                <Card selectedId={selectedId} id={cv.id}>
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="font-medium text-slate-900 truncate">{cv.title}</h3>
                            <div class="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                                <span class="flex items-center gap-1">
                                    <Clock class="w-3 h-3" />
                                    {format(new Date(cv.lastModifiedAt), 'MMM d, yyyy')}
                                </span>
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            <button class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
                                "hover:bg-accent hover:text-accent-foreground h-8 w-8 text-slate-400 hover:text-indigo-600"
                            }`}
                                onclick={() => sendMessage(CV_EVENTS.LOAD_CV, cv.id)}
                            >
                                <Pencil class="w-4 h-4" />
                            </button>
                            <button class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
                                "hover:bg-accent hover:text-accent-foreground h-8 w-8 text-slate-400 hover:text-red-600"
                            }`}
                                onclick={() => sendMessage(CV_EVENTS.DELETE_CV, cv.id)}    
                            >
                                <Trash class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
    </div>
</div>