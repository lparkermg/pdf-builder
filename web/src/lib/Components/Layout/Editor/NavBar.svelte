<script lang="ts">
    interface NavBarProps {
        canInteract: boolean;
        fileTitleValue: string;
        onFileTitleChanged: (newTItle:string) => void;
        onGenerate:() => void;
        onSave: () => void;
    }

    let { canInteract, fileTitleValue = $bindable(), onFileTitleChanged, onGenerate, onSave }: NavBarProps = $props()
</script>

<nav class="content-nav">
    <input type="text" placeholder="Enter file title here..." bind:value={fileTitleValue} onchange={e => onFileTitleChanged(e.currentTarget.value)} disabled={!canInteract}/>
    <div>
        <button class="btn btn-positive" onclick={onGenerate} disabled={!canInteract}>Generate</button>
        <button class="btn btn-primary" onclick={onSave} disabled={!canInteract}>Save</button>
    </div>
</nav>