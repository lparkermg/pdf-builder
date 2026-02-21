import type { CvModel } from "$lib/internal/models";
import type { AvailableTemplatesResponse, AvailableThemesResponse, CvDeleteResponse, CvLoadResponse, MetadataResponse } from "./models/responses";

export async function getMetadata(baseUri: string, origin:string, abortController: AbortController, onError: (e: Error) => void): Promise<MetadataResponse | undefined> {
    if (baseUri.trim() === "" || origin.trim() === ""){
        onError(new Error("Failed configuration validation for baseUri or origin. Both have to be populated."))
        return undefined;
    }

    const uri = `${baseUri}/saves/metadata`;
    const response = await fetch(uri, {
        method: "GET",
        signal: abortController.signal
    });

    if(!response.ok){
        onError(new Error(`Failed to get metadata with status ${response.statusText} (${response.status})`))
        return undefined;
    }

    return await response.json() as MetadataResponse;
}

export async function getTemplates(baseUri: string, origin:string, abortController: AbortController, onError: (e: Error) => void): Promise<AvailableTemplatesResponse | undefined>{
    if (baseUri.trim() === "" || origin.trim() === ""){
        onError(new Error("Failed configuration validation for baseUri or origin. Both have to be populated."))
        return undefined;
    }

    const uri = `${baseUri}/templates`;
    const response = await fetch(uri, {
        method: "GET",
        signal: abortController.signal
    });

    if(!response.ok){
        onError(new Error(`Failed to get cv with status ${response.statusText} (${response.status})`))
        return undefined;
    }

    return await response.json() as AvailableTemplatesResponse;
}

export async function getThemes(baseUri: string, origin:string, abortController: AbortController, onError: (e: Error) => void): Promise<AvailableThemesResponse | undefined>{
    if (baseUri.trim() === "" || origin.trim() === ""){
        onError(new Error("Failed configuration validation for baseUri or origin. Both have to be populated."))
        return undefined;
    }

    const uri = `${baseUri}/themes`;
    const response = await fetch(uri, {
        method: "GET",
        signal: abortController.signal
    });

    if(!response.ok){
        onError(new Error(`Failed to get cv with status ${response.statusText} (${response.status})`))
        return undefined;
    }

    return await response.json() as AvailableThemesResponse;
}

export async function getCv(baseUri: string, origin: string, abortController: AbortController, onError: (e: Error) => void, id: string): Promise<CvLoadResponse | undefined>{
    if (baseUri.trim() === "" || origin.trim() === ""){
        onError(new Error("Failed configuration validation for baseUri or origin. Both have to be populated."))
        return undefined;
    }

    const uri = `${baseUri}/saves?id=${id}`;
    const response = await fetch(uri, {
        method: "GET",
        signal: abortController.signal
    });

    if(!response.ok){
        onError(new Error(`Failed to get cv with status ${response.statusText} (${response.status})`))
        return undefined;
    }

    return await response.json() as CvLoadResponse;
}

export async function deleteCv(baseUri: string, origin: string, abortController: AbortController, onError: (e: Error) => void, id: string): Promise<CvDeleteResponse | undefined>{
    if (baseUri.trim() === "" || origin.trim() === ""){
        onError(new Error("Failed configuration validation for baseUri or origin. Both have to be populated."))
        return undefined;
    }

    const uri = `${baseUri}/saves?id=${id}`;
    const response = await fetch(uri, {
        method: "DELETE",
        signal: abortController.signal
    });

    if(!response.ok){
        onError(new Error(`Failed to delete cv with status ${response.statusText} (${response.status})`))
        return undefined;
    }

    return await response.json() as CvDeleteResponse;
}



export async function saveNewCv(
    baseUri: string,
    origin: string,
    abortController: AbortController,
    onError: (e: Error) => void,
    title: string,
    cv: CvModel): Promise<string | undefined> {
    if (baseUri.trim() === "" || origin.trim() === ""){
        onError(new Error("Failed configuration validation for baseUri or origin. Both have to be populated."))
        return undefined;
    }

    const jsonContent = JSON.stringify(cv);

    const uri = `${baseUri}/saves/new`;
    const response = await fetch(uri, {
        method: "POST",
        body: JSON.stringify({
            title,
            content: jsonContent
        }),
        headers:{
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    });

    if(!response.ok){
        onError(new Error(`Failed to save cv with status ${response.statusText} (${response.status})`))
        return undefined;
    }

    return await response.text()
}

export async function saveCv(
    baseUri: string,
    origin: string,
    abortController: AbortController,
    onError: (e: Error) => void,
    id: string,
    title: string,
    cv: CvModel
): Promise<void>{
    if (baseUri.trim() === "" || origin.trim() === ""){
        onError(new Error("Failed configuration validation for baseUri or origin. Both have to be populated."))
        return;
    }

    const jsonContent = JSON.stringify(cv);

    const uri = `${baseUri}/saves/update`;
    const response = await fetch(uri, {
        method: "PATCH",
        body: JSON.stringify({
            id,
            title,
            content: jsonContent
        }),
        headers:{
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    });

    if(!response.ok){
        onError(new Error(`Failed to save cv with status ${response.statusText} (${response.status})`))
        return;
    }

    return;
}