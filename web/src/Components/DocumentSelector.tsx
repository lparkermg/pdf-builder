import { MetadataItemResponse } from "../../models/api";

interface DocumentSelectorProps {
    metadata: MetadataItemResponse[];
    onNewDocument(): void;
    onDocumentSelected(id: string): void;
}

function DocumentSelector({metadata, onNewDocument, onDocumentSelected}: DocumentSelectorProps){
    
    const items = metadata.map((v) => {
        if(v.id === "new"){
            return <button onClick={onNewDocument}>
                <span>+</span>
            </button>
        }
        else{
            return <button onClick={() => onDocumentSelected(v.id)}>
                <div>
                    <h3>{v.title}</h3>
                    <div>
                        <span>Last Updated</span>
                        <span>{v.lastModifiedAt.toLocaleString()}</span>
                    </div>
                    
                </div>
            </button>
        }
    })

    return <section>

    </section>
}

export default DocumentSelector;