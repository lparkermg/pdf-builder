<script lang="ts">
	import HeaderNavigation from "$lib/Components/Global/HeaderNavigation.svelte";
	import LandingArea from "$lib/Components/Layout/LandingArea.svelte";
</script>

<HeaderNavigation title={"PDF Generator"}>
    <div>Home</div>
</HeaderNavigation>

<LandingArea items={[]} onNewClick={() => {}} onLoadItemClick={(i) => {}}>

</LandingArea>