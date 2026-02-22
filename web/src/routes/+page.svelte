<script>
    import Background from "$lib/areas/Background.svelte";
    import AreaLink from "$lib/areas/main-page/AreaLink.svelte";
    import { FileText } from "lucide-svelte";

</script>
<Background>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold text-slate-800">PDF Builder</h1>
        <p class="text-md font-semibold text-slate-400">Build various types of documents</p>
    </div>
    <div class="flex flex-col gap-2">
        <AreaLink href="/cv">
            <FileText class="w-16 h-16 text-violet-400"/>
            <h1 class="text-lg font-bold">CV Builder</h1>
            <p class="text-md font-semibold text-slate-400">Build CVs using markdown and generate them into PDFs.</p>
        </AreaLink>
    </div>
</Background>