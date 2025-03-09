import { ThemeResponse, TemplateResponse, CvRequest, MetadataResponse, CvDocument, UnparsedLoadResponse } from '../models/api';
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

export async function loadMetadata(): Promise<MetadataResponse> {
    const resp = await fetch(`${API_BASE_URI}/saves/metadata`);

    return await resp.json() as MetadataResponse;
}

export async function load(id: string): Promise<CvDocument> {
    const resp = await fetch(`${API_BASE_URI}/saves?id=${id}`);
    const parsedResponse = await resp.json() as UnparsedLoadResponse;
    return JSON.parse(parsedResponse.content) as CvDocument;
}

export async function saveNew(content: CvDocument, title: string): Promise<string>{
    const resp = await fetch(`${API_BASE_URI}/saves/new`,
        {
            method: 'POST',
            body: JSON.stringify({ content, title }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    return await resp.text();
}

export async function saveUpdate(id: string, title: string, content: CvDocument){
    const resp = await fetch(`${API_BASE_URI}/saves/update`,
        {
            method: 'POST',
            body: JSON.stringify({ id, content, title }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    return await resp.text();
}