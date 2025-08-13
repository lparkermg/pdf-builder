import type { CvDocument, CvRequest, UnparsedLoadResponse } from "$lib/models/api";

export async function generate(onerror: (e: Error) => void, request: CvRequest, baseUri: string | undefined, origin: string | undefined): Promise<string | null> {
    if (!baseUri) {
        console.error({function: "cv - generate", message: "Error", data: "provided baseUri is undefined"})
        onerror(new Error("Failed config validation to generate cv"))
        return null
    }

    if (!origin){
        console.error({function: "cv - generate", message: "Error", data: "provided origin is undefined"})
        onerror(new Error("Failed config validation to generate cv"))
        return null
    }

    if (request === null){
        console.error({function: "cv - generate", message: "Error", data: "provided request is null"})
        onerror(new Error("Request must be populated in order to generate a cv"))
        return null
    }

    const uri = `${baseUri}cv`;
    const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!resp.ok){
        console.error({function: "cv - generate", message: "Error", data: resp.statusText, body: await resp.text()})
        onerror(new Error("Failed to generate cv"))
        return null
    }

    return `${baseUri}` + (await resp.text()).replace('"', '').replace('"','')
}

export async function save(onerror: (e: Error) => void, id: string | undefined, title: string, content: CvDocument, baseUri: string | undefined, origin: string | undefined): Promise<string> {
    if (!baseUri){
        console.error({function: "cv - save", message: "Error", data: "provided baseUri is undefined"})
        onerror(new Error("Failed config validation to save cv"))
        return ""
    }

    if (!origin){
        console.error({function: "cv - save", message: "Error", data: "provided origin is undefined"})
        onerror(new Error("Failed config validation to save cv"))
        return ""
    }

    if (title.trim() === "" || content === null){
        console.error({function: "cv - save", message: "Error", data: "save data is invalid"})
        onerror(new Error("Save data must be populated in order to save cv"))
        return ""
    }

    let uri = '';
    let method = '';
    let body = '';

    if (id === undefined){
        uri = `${baseUri}saves/new`
        method = "POST"
        body = JSON.stringify({ title, content })
    }
    else {
        uri = `${baseUri}saves/update`
        method = "PATCH"
        body = JSON.stringify({ id, title, content})
    }

    const resp = await fetch(uri, {
        method: method,
        body: body,
        headers: {
            "origin": `${origin}`
        }
    })

    if (!resp.ok){
        console.error({function: "cv - save", message: "Error", data: resp.statusText, body: await resp.text()})
        onerror(new Error("There was a problem saving cv"))
        return ""
    }

    return await resp.text()
}

export async function load(onerror: (e: Error) => void, id: string, baseUri: string | undefined, origin: string | undefined): Promise<CvDocument | undefined> {
    if (!baseUri){
        console.error({function: "cv - load", message: "Error", data: "provided baseUri is undefined"})
        onerror(new Error("Failed config validation to load cv"))
        return undefined
    }

    if (!origin){
        console.error({function: "cv - load", message: "Error", data: "provided origin is undefined"})
        onerror(new Error("Failed config validation to load cv"))
        return undefined
    }

    if (id.trim() === ""){
        console.error({function: "cv - load", message: "Error", data: "id must be populated"})
        onerror(new Error("Id must be populated to load cv"))
        return undefined
    }

    const uri = `${baseUri}saves?id=${id}`
    const resp = await fetch(uri, {
        method: "GET",
        headers:{
            "origins": `${origin}`
        }
    })

    if (!resp.ok){
        console.error({function: "cv - load", message: "Error", data: resp.statusText, body: await resp.text()})
        onerror(new Error("Failed to load cv"))
        return undefined
    }

    const unparsedResp = await resp.json() as UnparsedLoadResponse

    return JSON.parse(unparsedResp.content) as CvDocument
}