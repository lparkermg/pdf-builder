export interface MetadataItemResponse {
    title: string,
    id: string,
    lastModifiedAt: string,
}

export interface MetadataResponse {
    metadata: MetadataItemResponse[];
}

export interface CvLoadResponse {
    id: string;
    content: string;
}

export interface AvailableTemplatesResponse{
    templates: TemplateItemResponse[];
}

export interface TemplateItemResponse {
    id: number;
    name: string;
}

export interface AvailableThemesResponse {
    themes: ThemeItemResponse[];
}

export interface ThemeItemResponse {
    id: number;
    name: string;
}