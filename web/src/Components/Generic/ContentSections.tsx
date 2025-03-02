interface ContentSectionsProps{
    title: string;
    content: string[];
    onContentChanged(index: number, newContent: string): void;
    onNewSectionAdded(): void;
    onContentRemoved(index: number): void
}

function ContentSections({title, content, onContentChanged,onNewSectionAdded, onContentRemoved}: ContentSectionsProps){

    const mappedContent = content.map((v,i) => <div className="content-entry">
        <button className="btn-cancel" onClick={() => onContentRemoved(i)}>Remove Section</button>
        <textarea onChange={e => onContentChanged(i, e.target.value)} value={v} />
            </div>
    );

    return <div className="content-section">
        <div className="section-header">
            <h2>{title}</h2>
            <button onClick={onNewSectionAdded}>+</button>
        </div>
        {mappedContent}
    </div>
}

export default ContentSections;