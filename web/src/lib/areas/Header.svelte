<script lang="ts">
    import { Button } from "bits-ui";

    let {
        title,
        subtitle,
        action
    } : {
        title: string,
        subtitle: string,
        action: string,
    } = $props();

    function handleActionClicked(){
        window.dispatchEvent(new Event('header-action-clicked'))
    }
</script>
<div class="flex items-center justify-between mb-8">
    <div>
        <h1 class="text-2xl font-semibold text-slate-900 tracking-tight">{title}</h1>
        <p class="text-slate-500 text-sm mt-1">{subtitle}</p>
    </div>
    <Button.Root 
        onclick={handleActionClicked}
        class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 px-4 shadow-lg shadow-indigo-200"
        >
        {action}
    </Button.Root>
</div>