<script lang="ts">
    import { Button } from "bits-ui";

    let {
        title,
        onTitleChanged
    }:{
        title: String,
        onTitleChanged: (newTitle: string) => void
    } = $props()
</script>
<div class="flex items-center gap-3 mb-4">
    <input
        class="w-full text-lg font-medium border-1 bg-slate-50 focus:bg-white transition-colors h-12 rounded-xl" 
        placeholder="CV Title..." 
        value={title}
        onchange={(e) => onTitleChanged(e.currentTarget.value)} 
    />        
</div>