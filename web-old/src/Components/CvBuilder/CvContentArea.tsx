import ContentSections from "../Generic/ContentSections";

interface CvContentAreaProps {
    pdfLink: string | null;
    error: string | null;
    title: string;
    onTitleChanged(newTitle: string): void;
    mainSections: string[];
    onMainSectionAdded(): void;
    onMainSectionUpdated(index: number, newContent: string): void;
    onMainSectionRemoved(index: number): void;
    sidebarSections: string[];
    onSidebarSectionAdded(): void;
    onSidebarSectionUpdated(index: number, newContent: string): void;
    onSidebarSectionRemoved(index: number): void;
    canSave: boolean;
    onSaveClicked(): void;
    onErrorClicked(): void;
}

function CvContentArea({ 
    title,
    mainSections,
    sidebarSections,
    error,
    pdfLink,
    canSave,
    onTitleChanged,
    onMainSectionAdded,
    onMainSectionUpdated,
    onMainSectionRemoved,
    onSidebarSectionAdded,
    onSidebarSectionUpdated,
    onSidebarSectionRemoved,
    onSaveClicked,
    onErrorClicked }: CvContentAreaProps){
    return (
        <div className="content">
            <nav className="toolbar">
                <label htmlFor="title-input">
                    <span>Title</span>
                    <input type="text" defaultValue={title} onChange={(e) => onTitleChanged(e.target.value)} placeholder="Document Title" />
                </label>
                <button type="button" onClick={onSaveClicked} disabled={!canSave}>Save</button>
            </nav>
            {error && <nav className="error" onClick={onErrorClicked}>
                <div>{error}</div></nav>}
            {pdfLink && <nav className="success">
                <div>PDF has been generated <a href={pdfLink}>click here</a> to download</div>
            </nav>}
            <ContentSections title={"Sidebar"} content={sidebarSections} onContentChanged={onSidebarSectionUpdated} onNewSectionAdded={onSidebarSectionAdded} onContentRemoved={onSidebarSectionRemoved} />
            <ContentSections title={"Main"} content={mainSections} onContentChanged={onMainSectionUpdated} onNewSectionAdded={onMainSectionAdded} onContentRemoved={onMainSectionRemoved} />
        </div>
    )
}

export default CvContentArea;