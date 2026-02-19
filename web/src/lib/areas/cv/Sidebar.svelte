<script lang="ts">
    let {
        title,
        count
    }: {
        title: string,
        count: number
    } = $props();
</script>
<div class="lg:col-span-4 xl:col-span-3">
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-200/50">
        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <span class="text-sm font-medium text-slate-600">{title}</span>
            <span class="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{count}</span>
        </div>
    </div>
</div>