import { ThemeResponse, TemplateResponse, CvRequest} from '../models/api';

export async function getThemes(): Promise<ThemeResponse> {
    const resp = await fetch("http://localhost:5117/themes")

    if (!resp.ok){
        throw new Error(resp.statusText);
    }

    return await resp.json() as ThemeResponse;
}

export async function getTemplates(): Promise<TemplateResponse> {
    const resp = await fetch("http://localhost:5117/templates");

    if (!resp.ok){
        throw new Error(resp.statusText);
    }

    return await resp.json() as TemplateResponse;
}

export async function postCv(request: CvRequest): Promise<Uint8Array>{
    const resp = await fetch("http://localhost:5117/cv", {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {'Content-Type': 'application/json'}
    });

    return await resp.bytes()
}