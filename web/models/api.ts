export interface CvRequest {
    template: number;
    theme: number;
    content: string[];
    sidebar: string[];
}

export interface DataPair {
    id: number;
    name: string;
}

export interface ThemeResponse {
    themes: DataPair[];
}

export interface TemplateResponse {
    templates: DataPair[];
}


export interface MetadataResponse {
    metadata: MetadataItemResponse[];
}

export interface MetadataItemResponse {
    id: string;
    title: string;
    lastModifiedAt: Date;
}

export interface UnparsedLoadResponse {
    id: string;
    content: string;
}

export interface CvDocument {
    template: number;
    theme: number;
    content: string[];
    sidebar: string[];
}