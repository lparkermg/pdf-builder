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
        <h1>{title}</h1>
        <button onClick={onNewSectionAdded}>+</button>
        {mappedContent}
    </section>
}

export default ContentSections;