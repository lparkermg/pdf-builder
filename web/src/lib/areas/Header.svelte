<script lang="ts">
    import { Button } from "bits-ui";
    import { ArrowBigLeft } from "lucide-svelte";

    let {
        title,
        subtitle,
        action
    } : {
        title: string,
        subtitle: string,
        action?: string,
    } = $props();

    function handleActionClicked(){
        window.dispatchEvent(new Event('header-action-clicked'))
    }
</script>
<div class="flex items-center justify-between mb-8">
    <div class="flex flex-row gap-8">
    <Button.Root
        href="/"
        class="flex flex-row items-center text-slate-400 hover:text-violet-400 focus:text-violet-800 max-w-[200px]"
        >
        <ArrowBigLeft class="mr-1"/>
        Go Home
    </Button.Root>
    <div>
        <h1 class="text-2xl font-semibold text-slate-900 tracking-tight">{title}</h1>
        <p class="text-slate-500 text-sm mt-1">{subtitle}</p>
    </div>
    </div>
    <Button.Root 
        onclick={handleActionClicked}
        class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 px-4 shadow-lg shadow-indigo-200"
        >
        {action}
    </Button.Root>
</div>