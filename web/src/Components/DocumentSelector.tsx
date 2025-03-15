import { MetadataItemResponse } from "../../models/api";

interface DocumentSelectorProps {
    metadata: MetadataItemResponse[];
    onNewDocument(): void;
    onDocumentSelected(id: string): void;
}

function DocumentSelector({metadata, onNewDocument, onDocumentSelected}: DocumentSelectorProps){
    
    const items = metadata.map((v) => {
        if(v.id === "new"){
            return <button className="doc-btn" onClick={onNewDocument}>
                <div className="doc-btn-content new-doc-btn-content">
                    <span>+</span>
                </div>
            </button>
        }
        else{
            return <button className="doc-btn" onClick={() => onDocumentSelected(v.id)}>
                <div className="doc-btn-content">
                    <h3>{v.title}</h3>
                    <div>
                        <span>{v.lastModifiedAt.toDateString()}</span>
                    </div>
                    
                </div>
            </button>
        }
    })

    return <section>
        {items}
    </section>
}

export default DocumentSelector;