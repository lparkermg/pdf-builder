import { ThemeResponse, TemplateResponse, CvRequest} from '../models/api';
import { API_BASE_URI } from '../src/consts'

export async function getThemes(): Promise<ThemeResponse> {
    const resp = await fetch(`${API_BASE_URI}/themes`)

    if (!resp.ok){
        throw new Error(resp.statusText);
    }

    return await resp.json() as ThemeResponse;
}

export async function getTemplates(): Promise<TemplateResponse> {
    const resp = await fetch(`${API_BASE_URI}/templates`);

    if (!resp.ok){
        throw new Error(resp.statusText);
    }

    return await resp.json() as TemplateResponse;
}

export async function postCv(request: CvRequest): Promise<string | null>{
    const resp = await fetch(`${API_BASE_URI}/cv`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return `${API_BASE_URI}` + (await resp.text()).replace('"', '').replace('"','')
}