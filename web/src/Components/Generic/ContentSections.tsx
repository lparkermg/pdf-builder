interface ContentSectionsProps{
    title: string;
    content: string[];
    onContentChanged(index: number, newContent: string): void;
    onNewSectionAdded(): void;
}

function ContentSections({title, content, onContentChanged,onNewSectionAdded}: ContentSectionsProps){

    const mappedContent = content.map((v,i) => 
        <textarea onChange={e => onContentChanged(i, e.target.value)} value={v} />
    );

    return <section>
        <div className="section-header">
            <h2>{title}</h2>
            <button onClick={onNewSectionAdded}>+</button>
        </div>
        {mappedContent}
    </section>
}

export default ContentSections;