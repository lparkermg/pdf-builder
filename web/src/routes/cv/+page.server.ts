import type { MetadataModel } from "$lib/internal/models";
import * as api from '$lib/api/api';
import { env } from "$env/dynamic/private"
import { error } from "@sveltejs/kit";
import { metadataResponseToModel } from "$lib/internal/utils/converters";

export interface PageLoadData{
    metadata: MetadataModel;
    baseUri: string;
}

export async function load(){
    const abortController = new AbortController();
    const resp = await api.getMetadata(
        env.PDFBUILDER_UI_Api__Internal__Uri,
        env.PDFBUILDER_UI_Host__Uri,
        abortController,
        (e) => error(500, e)
    )

    if(resp === undefined){
        error(500, new Error("Failed to get metadata"))
    }

    return {
        metadata: metadataResponseToModel(resp),
        baseUri: env.PDFBUILDER_UI_Api__External__Uri
    }
}