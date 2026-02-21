<script lang="ts">
    import Background from "$lib/areas/Background.svelte";
    import Editor from "$lib/areas/cv/editor/Editor.svelte";
    import Sidebar from "$lib/areas/cv/Sidebar.svelte";
    import GridContent from "$lib/areas/GridContent.svelte";
    import Header from "$lib/areas/Header.svelte";
    import { onMount } from "svelte";
    import type { PageLoadData } from "./+page.server";
    import { on } from "svelte/events";
    import { CV_EVENTS, EMPTY_CV } from "$lib/internal/constants";
    import * as api from "$lib/api/api";
    import type { CvModel } from "$lib/internal/models";
    import { metadataResponseToModel } from "$lib/internal/utils/converters";
    interface CvPageProps {
        data: PageLoadData
    }
    const { data }: CvPageProps = $props()

    let abortController = new AbortController();
    let cvs = $state(data.metadata.metadata)
    let currentCv: CvModel = $state(EMPTY_CV)
    let selectedId: string | undefined = $state(undefined)
    let title: string | undefined = $state(undefined)

    onMount(() => {
        on(window, "header-action-clicked", (e: Event) => {
            currentCv = EMPTY_CV
            selectedId = undefined
            title = undefined
        })
        on(window, CV_EVENTS.LOAD_CV, async (e: Event) => {
            abortController.abort()
            abortController = new AbortController();

            const { id } = (e as CustomEvent<{ id: string}>).detail;
            selectedId = id

            const loadedMetadata = await api.getMetadata(data.baseUri, window.location.host, abortController, (e) => console.error(e));
            const loadedCv = await api.getCv(data.baseUri, window.location.host, abortController, (e) => console.error(e), id);
            
            if (loadedCv){
                title = loadedMetadata?.metadata.find(m => m.id === id)?.title
                currentCv = JSON.parse(loadedCv.content) as CvModel
            }
            else{
                console.error("There was some error loading the cv, show show the error on the page.")
            }
            
        })

        on(window, CV_EVENTS.DELETE_CV, (e: Event) => {
            const { id } = (e as CustomEvent<{ id: string}>).detail;

            if (id === selectedId){
                selectedId = undefined
                currentCv = EMPTY_CV
                title = undefined
            }
            // TODO: Request to delete CV here.
        })

        on(window, CV_EVENTS.SAVE_CV, async (e:Event) => {
            if(selectedId || selectedId?.trim() !== ""){
                // We're updating an existing CV.
                await api.saveCv(
                    data.baseUri,
                    window.location.host,
                    abortController,
                    (e) => console.error(e),
                    selectedId!,
                    title!,
                    currentCv)
            } else {
                // We're saving a new CV.
                selectedId = await api.saveNewCv(
                    data.baseUri,
                    window.location.host,
                    abortController,
                    (e) => console.error(e),
                    title!,
                    currentCv
                )
            }

            const loadedMetadata = await api.getMetadata(data.baseUri, window.location.host, abortController, (e) => console.error(e));

            if(loadedMetadata){
                cvs = metadataResponseToModel(loadedMetadata).metadata
            }
        })

        on(window, CV_EVENTS.CV_TITLE_UPDATED, (e:Event) => {
            const { newTitle } = (e as CustomEvent<{ newTitle: string }>).detail;

            title = newTitle
        })
    })

</script>
<Background>
    <Header title="CV Builder" subtitle="Create and manage your CVs with markdown" action="+ New CV"/>
    <GridContent>
        <!--Sidebar-->
        <Sidebar 
            title="Your CVs"
            cvs={cvs}
            selectedId={selectedId}
        />
        <!--Editor Area-->
        <Editor title={title ?? ""} cv={currentCv} />
    </GridContent>
</Background>
        
