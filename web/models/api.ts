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