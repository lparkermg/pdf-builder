import ContentSections from "../Generic/ContentSections";

interface CvContentAreaProps {
    pdfLink: string | null;
    mainSections: string[];
    onMainSectionAdded(): void;
    onMainSectionUpdated(index: number, newContent: string): void;
    onMainSectionRemoved(index: number): void;
    sidebarSections: string[];
    onSidebarSectionAdded(): void;
    onSidebarSectionUpdated(index: number, newContent: string): void;
    onSidebarSectionRemoved(index: number): void;
}

function CvContentArea({ 
    mainSections,
    sidebarSections,
    pdfLink,
    onMainSectionAdded,
    onMainSectionUpdated,
    onMainSectionRemoved,
    onSidebarSectionAdded,
    onSidebarSectionUpdated,
    onSidebarSectionRemoved }: CvContentAreaProps){
    return (
        <div className="content">
            {pdfLink && <nav className="success">
                <div>PDF has been generated <a href={pdfLink}>click here</a> to download</div>
            </nav>}
            <ContentSections title={"Sidebar"} content={sidebarSections} onContentChanged={onSidebarSectionUpdated} onNewSectionAdded={onSidebarSectionAdded} onContentRemoved={onSidebarSectionRemoved} />
            <ContentSections title={"Main"} content={mainSections} onContentChanged={onMainSectionUpdated} onNewSectionAdded={onMainSectionAdded} onContentRemoved={onMainSectionRemoved} />
        </div>
    )
}

export default CvContentArea;