import type { ThemeResponse, TemplateResponse } from "$lib/models/api";

export async function getThemes(onerror: (e: Error) => void, baseUri: string | undefined, origin: string | undefined): Promise<ThemeResponse> {
    if (!baseUri){
        console.error({function: "data - getThemes", message: "Error", data: "provided baseUri is undefined"})
        onerror(new Error("Failed config validation to load themes"));
        return {
            themes: []
        }
    }

    if (!origin){
        console.error({function: "data - getThemes", message: "Error", data: "provided origin is undefined"})
        onerror(new Error("Failed config validation to load themes"))
        return {
            themes: []
        }
    }

    const uri = `${baseUri}themes`
    const resp = await fetch(uri, {
        method: 'GET',
        headers: {
            "origin": `${origin}`
        }
    });

    if (!resp.ok){
        console.error({function: "data - getThemes", message: "Error", data: resp.statusText, body: await resp.text()})
        onerror(new Error("Failed to load themes"))
        return {
            themes:[]
        }
    }

    return await resp.json() as ThemeResponse;
}

export async function getTemplates(onerror: (e: Error) => void, baseUri: string | undefined, origin: string | undefined): Promise<TemplateResponse> {
    if (!baseUri){
        console.error({function: "data - getTemplates", message: "Error", data: "provided baseUri is undefined"})
        onerror(new Error("Failed config validation to load themes"));
        return {
            templates: []
        }
    }

    if (!origin){
        console.error({function: "data - getTemplates", message: "Error", data: "provided origin is undefined"})
        onerror(new Error("Failed config validation to load themes"))
        return {
            templates: []
        }
    }

    const uri = `${baseUri}themes`
    const resp = await fetch(uri, {
        method: 'GET',
        headers: {
            "origin": `${origin}`
        }
    });

    if (!resp.ok){
        console.error({function: "data - getTemplates", message: "Error", data: resp.statusText, body: await resp.text()})
        onerror(new Error("Failed to load themes"))
        return {
            templates:[]
        }
    }

    return await resp.json() as TemplateResponse;
}