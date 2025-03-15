interface ContentSectionsProps{
    title: string;
    content: string[];
    onContentChanged(index: number, newContent: string): void;
    onNewSectionAdded(): void;
    onContentRemoved(index: number): void
}

function ContentSections({title, content, onContentChanged,onNewSectionAdded, onContentRemoved}: ContentSectionsProps){

    const mappedContent = content.map((v,i) => <div key={i} className="content-entry">
        <button className="btn-cancel" onClick={() => onContentRemoved(i)}>Remove Section</button>
        <textarea onChange={e => onContentChanged(i, e.target.value)} value={v} />
            </div>
    );

    if (mappedContent.length === 0){
        return <div className="content-section">
            <div className="section-header">
                <h2>{title}</h2>
                <button onClick={onNewSectionAdded}>+</button>
            </div>
            <p>No sections have been added</p>
        </div>
    }

    return <div className="content-section">
        <div className="section-header">
            <h2>{title}</h2>
            <button onClick={onNewSectionAdded}>+</button>
        </div>
        {mappedContent}
    </div>
}

export default ContentSections;