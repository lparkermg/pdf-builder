<script lang="ts">
	import type { MetadataItemResponse } from "$lib/models/api";

    interface LandingAreaProps {
        items: MetadataItemResponse[]
        onNewClick: () => void;
        onLoadItemClick: (id: string) => void;
    }

    const { items, onNewClick, onLoadItemClick }: LandingAreaProps = $props()
</script>

<section class="landing-centre">
    <aside class="landing-content">
        {#each items as item}
            <button class="btn-landing" onclick={() => onLoadItemClick(item.id)}>
                {item.title} - {item.lastModifiedAt.toString()}
            </button>
        {/each}
        <button class="btn-landing" onclick={onNewClick}>+</button>
    </aside>
</section>