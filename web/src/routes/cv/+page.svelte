<script>
    import Background from "$lib/areas/Background.svelte";
    import Editor from "$lib/areas/cv/editor/Editor.svelte";
    import Sidebar from "$lib/areas/cv/Sidebar.svelte";
    import GridContent from "$lib/areas/GridContent.svelte";
import Header from "$lib/areas/Header.svelte";

</script>
<Background>
    <Header title="CV Builder" subtitle="Create and manage your CVs with markdown" action="+ New CV"/>
    <GridContent>
        <!--Sidebar-->
        <Sidebar title="Your CVs" count={0} />
        <!--Editor Area-->
        <Editor />
    </GridContent>
</Background>
        
