import type { DataPairModel, MetadataModel } from "$lib/internal/models";
import * as api from '$lib/api/api';
import { env } from "$env/dynamic/private"
import { error } from "@sveltejs/kit";
import { metadataResponseToModel, templatesResponseToDataPair, themesResponseToDataPair } from "$lib/internal/utils/converters";

export interface PageLoadData{
    metadata: MetadataModel;
    baseUri: string;
    themes: DataPairModel[];
    templates: DataPairModel[];
}

export async function load(){
    const abortController = new AbortController();
    const resp = await Promise.all(
        [
            api.getMetadata(
                env.PDFBUILDER_UI_Api__Internal__Uri,
                env.PDFBUILDER_UI_Host__Uri,
                abortController,
                (e) => error(500, e)),
            api.getTemplates(
                env.PDFBUILDER_UI_Api__Internal__Uri,
                env.PDFBUILDER_UI_Host__Uri,
                abortController,
                (e) => error(500, e)),
            api.getThemes(
                env.PDFBUILDER_UI_Api__Internal__Uri,
                env.PDFBUILDER_UI_Host__Uri,
                abortController,
                (e) => error(500, e)
            )
        ])

    if(resp.some(r => r === undefined)){
        error(500, new Error("Failed to get some details"))
    }

    return {
        metadata: metadataResponseToModel(resp[0]!),
        baseUri: env.PDFBUILDER_UI_Api__External__Uri,
        themes: themesResponseToDataPair(resp[2]!),
        templates: templatesResponseToDataPair(resp[1]!)
    }
}