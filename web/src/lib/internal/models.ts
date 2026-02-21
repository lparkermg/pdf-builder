export interface MetadataModel{
    metadata: MetadataItemModel[];
}

export interface MetadataItemModel{
    title: string;
    id: string;
    lastModifiedAt: string;
}

export interface CvModel {
    template: number;
    theme: number;
    content: string[];
    sidebar: string[];
}

export interface DataPairModel {
    id: number;
    display: string;
}