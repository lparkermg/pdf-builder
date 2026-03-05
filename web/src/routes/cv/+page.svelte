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
    import { Button } from "bits-ui";
    import { SquareX } from "lucide-svelte";
    import NotificationBanner from "$lib/ui/components/notification-banner.svelte";
    import { fade } from "svelte/transition";
    interface CvPageProps {
        data: PageLoadData
    }
    const { data }: CvPageProps = $props()
    console.log(data)
    let abortController = new AbortController();
    let cvs = $state(data.metadata.metadata)
    let currentCv: CvModel = $state(EMPTY_CV)
    let selectedId: string | undefined = $state(undefined)
    let title: string | undefined = $state(undefined)

    let showNotification: boolean = $state(false)
    let notificationMessage: string = $state("")
    let notificationType: "success" | "error" | "info" = $state("success")
    let downloadLink: string | undefined = $state(undefined)



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

        on(window, CV_EVENTS.DELETE_CV, async (e: Event) => {
            const { id } = (e as CustomEvent<{ id: string}>).detail;

            if (id === selectedId){
                selectedId = undefined
                currentCv = EMPTY_CV
                title = undefined
            }

            const resp = await api.deleteCv(
                data.baseUri,
                window.location.host,
                abortController,
                (e) => console.error(e),
                id);

            if (resp !== undefined && resp.success){
                const loadedMetadata = await api.getMetadata(data.baseUri, window.location.host, abortController, (e) => console.error(e));

                if(loadedMetadata){
                    cvs = metadataResponseToModel(loadedMetadata).metadata
                }
            }
        })

        on(window, CV_EVENTS.SAVE_CV, async (e:Event) => {
            if(selectedId !== undefined && selectedId?.trim() !== ""){
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

        on(window, CV_EVENTS.GENERATE_CV, async (e:Event) => {
            if(selectedId !== undefined && selectedId?.trim() !== ""){
                // We're generating an existing CV.
                const link = await api.generateCv(
                    data.baseUri,
                    window.location.host,
                    abortController,
                    (e) => console.error(e),
                    currentCv,
                )

                if(link){
                    downloadLink = `${data.baseUri}${link.replaceAll('"', '')}`
                    notificationMessage = "CV generated successfully!"
                    notificationType = "success"
                    showNotification = true
                } else {
                    notificationMessage = "There was an error generating your CV. Please try again."
                    notificationType = "error"
                    showNotification = true
                }
            } else {
                // Log that we can't generate a CV that hasn't been saved yet, or show a message on the UI.
                console.error("Can't generate a CV that hasn't been saved yet.")
            }
        })

        on(window, CV_EVENTS.CV_TITLE_UPDATED, (e:Event) => {
            const { newTitle } = (e as CustomEvent<{ newTitle: string }>).detail;

            title = newTitle
        })

        on(window, CV_EVENTS.CV_SECTION_ADDED, (e:Event) => {
            const { type } = (e as CustomEvent<{ type:string }>).detail
            if(type === "sidebar"){
                currentCv.sidebar.push("")
            }
            if(type === "main"){
                currentCv.content.push("")
            }
        })

        on(window, CV_EVENTS.CV_SECTION_UPDATED, (e:Event) => {
            const { type, sectionId, newContent } = (e as CustomEvent<{ type:string, sectionId:number, newContent:string }>).detail

            if(type === "sidebar"){
                currentCv.sidebar[sectionId] = newContent
            }
            if(type === "main"){
                currentCv.content[sectionId] = newContent
            }
        })

        on(window, CV_EVENTS.CV_SECTION_REMOVED, (e:Event) => {
            const { type, sectionId } = (e as CustomEvent<{ type:string, sectionId:number }>).detail

            if(type === "sidebar"){
                currentCv.sidebar.splice(sectionId, 1)
            }
            if(type === "main"){
                currentCv.content.splice(sectionId, 1)
            }
        })

        on(window, CV_EVENTS.CV_SETTING_CHANGED, (e: Event) => {
            const { type, newSetting } = (e as CustomEvent<{ type:string, newSetting:number}>).detail

            if(type === "theme"){
                currentCv.theme = newSetting
            }
            if(type === "template"){
                currentCv.template = newSetting
            }
        })
    })

    function downloadCv(){
        if(downloadLink){
            fetch(downloadLink).then(resp => resp.blob())
            .then(blob => {
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${title ?? "cv"}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showNotification = false;
                    });
        }
    }

</script>
<Background>
    <Header title="CV Builder" subtitle="Create and manage your CVs with markdown" action="+ New CV"/>
    {#if showNotification}
        <NotificationBanner message={notificationMessage} type={notificationType} onDismiss={() => showNotification = false} transition={n => fade(n, { duration: 250 })}>
            {#if downloadLink}
                <Button.Root class="rounded-xl p-1 pl-2 pr-2 bg-green-100 text-green-800 hover:text-green-700 hover:bg-green-200" onclick={downloadCv}>Download CV</Button.Root>
            {/if}
        </NotificationBanner>
    {/if}
    <GridContent>
        <!--Sidebar-->
        <Sidebar 
            title="Your CVs"
            cvs={cvs}
            selectedId={selectedId}
        />
        <!--Editor Area-->
        <Editor title={title ?? ""} cv={currentCv} themes={data.themes} templates={data.templates} canGenerate={selectedId != undefined}/>
    </GridContent>
</Background>
        
