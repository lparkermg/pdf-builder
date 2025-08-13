<script lang="ts">
	import HeaderNavigation from "$lib/Components/Global/HeaderNavigation.svelte";
	import LandingArea from "$lib/Components/Layout/LandingArea.svelte";
	import type { MetadataResponse } from "$lib/models/api";
	import type { MainDataModel } from "./+page.server.js";
	import CvEditor from "$lib/Components/Layout/CvEditor.svelte";

	interface PageLoadProps {
		data: MainDataModel
	}

	const { data }: PageLoadProps = $props()

	let currentDocumentId: string | undefined = $state(undefined)
	let metadata: MetadataResponse = $state(data.metadata)

	function home(){
		currentDocumentId = undefined
	}

	function newCv(){
		currentDocumentId = ""
	}

	async function loadCv(id: string){
		currentDocumentId = id
	}
</script>

<HeaderNavigation title={"PDF Generator"}>
    <button onclick={home}>Home</button>
</HeaderNavigation>

{#if currentDocumentId === undefined}
	<LandingArea items={metadata.metadata} onNewClick={newCv} onLoadItemClick={loadCv} />
{:else}
	<CvEditor apiBase={data.apiUri} id={currentDocumentId!} />
{/if}