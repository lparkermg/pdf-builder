<script lang="ts">
    import { Button } from "bits-ui";
    import { SquareX } from "lucide-svelte";
    import type { Snippet } from "svelte";
    import { type TransitionConfig } from "svelte/transition";

    let {
        message,
        type,
        children,
        onDismiss,
        transition
    }:{
        message: string,
        type: "success" | "error" | "info",
        children?: Snippet,
        onDismiss: () => void,
        transition: (node: Element) => TransitionConfig
    } = $props()

    let bgColorClass = "";
    let textColorClass = "";
    switch(type){
        case "success":
            bgColorClass = "bg-green-800";
            textColorClass = "text-green-200";
            break;
        case "error":
            bgColorClass = "bg-red-800";
            textColorClass = "text-red-200";
            break;
        case "info":
            bgColorClass = "bg-blue-800";
            textColorClass = "text-blue-200";
            break;
    }
</script>

<div class={`rounded-xl ${bgColorClass} ${textColorClass} shadow p-4 mb-6`} transition:transition>
        <div class="flex flex-row justify-between items-center gap-4">
            <p class="text-m">{message}</p>
            <div class="flex items-center gap-2">
                {@render children?.()}
                <Button.Root onclick={onDismiss}>
                    <SquareX />
                </Button.Root>
            </div>
        </div>
    </div>