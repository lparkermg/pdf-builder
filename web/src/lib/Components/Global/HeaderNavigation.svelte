<script lang="ts">
	import type { Snippet } from "svelte";

    interface HeaderNavigationProps {
        title: string;
    }

    const { title, children } = $props()
</script>

<header>
    <nav>
        <div><strong>{title}</strong></div>
        {@render children?.()}
    </nav>
</header>