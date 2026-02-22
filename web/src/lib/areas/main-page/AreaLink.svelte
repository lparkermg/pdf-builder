<script lang="ts">
    import { Button } from "bits-ui";
    import type { Snippet } from "svelte";

    let {
        href,
        children
    }: {
        href: string,
        children?: Snippet
    } = $props();
</script>

<Button.Root
    href={href}
    class="flex flex-col items-center justify-center gap-2 min-h-[300px] min-w-[300px] max-w-[300px] p-8 transition-colors bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:border-violet-800"
>
    {@render children?.()}
</Button.Root>