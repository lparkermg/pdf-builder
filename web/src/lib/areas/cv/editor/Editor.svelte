<script>
    import { fade, fly } from "svelte/transition";
    import Header from "./Header.svelte";

</script>
<div class="lg:col-span-8 xl:col-span-9">
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 min-h-[300px]">
        <div class="h-full flex flex-col">
            <Header title="" onTitleChanged={(e) => console.log({e})}/>
        </div>
    </div>
</div>