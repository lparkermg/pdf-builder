interface CvRequest {
    template: number;
    theme: number;
    content: string[];
    sidebar: string[];
}

interface DataPair {
    id: number;
    name: string;
}

interface ThemeResponse {
    themes: DataPair[];
}

interface TemplateResponse {
    templates: DataPair[];
}