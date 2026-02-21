import type { AvailableTemplatesResponse, AvailableThemesResponse, MetadataResponse } from "$lib/api/models/responses";
import type { DataPairModel, MetadataModel } from "../models";

export function metadataResponseToModel(metadata: MetadataResponse): MetadataModel {
    return metadata as MetadataModel
}

export function themesResponseToDataPair(themes: AvailableThemesResponse): DataPairModel[] {
    return themes.themes.map(d => {
        return { id: d.id, display: d.name} as DataPairModel
    })
}

export function templatesResponseToDataPair(templates: AvailableTemplatesResponse): DataPairModel[] {
    return templates.templates.map(d => {
        return { id: d.id, display: d.name} as DataPairModel
    })
}