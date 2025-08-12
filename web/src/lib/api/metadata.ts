import type { MetadataResponse } from "$lib/models/api";

export async function load(onerror: (e: Error) => void, baseUri: string | undefined, origin: string | undefined): Promise<MetadataResponse> {
    if(!baseUri) {
        console.error({function: "metadata - load", message: "Error", data: "provided baseUri is undefined"})
        onerror(new Error("Failed config validation to load metadata."))
        return {
            metadata: []
        }
    }

    if (!origin) {
        console.error({function: "metadata - load", message: "Error", data: "provided origin is undefined"})
        onerror(new Error("Failed config validation to load metadata."))
        return {
            metadata: []
        }
    }

    const uri = `${baseUri}saves/metadata`;
    const resp = await fetch(uri, {
        method: 'GET',
        headers:{
            "origin": `${origin}`
        }
    });

    if (!resp.ok){
        console.error({function: "metadata - load", message: "Error", data: resp.statusText, body: await resp.text()})
        onerror(new Error("Failed to load metadata."))
        return {
            metadata: []
        }
    }

    return await resp.json() as MetadataResponse;
}