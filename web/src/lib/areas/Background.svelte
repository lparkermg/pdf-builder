<script lang="ts">
    let {
        children
    }= $props()
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-300">
    <div class="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {@render children?.()}
    </div>
</div>