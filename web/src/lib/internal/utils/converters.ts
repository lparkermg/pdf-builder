import type { MetadataResponse } from "$lib/api/models/responses";
import type { MetadataModel } from "../models";

export function metadataResponseToModel(metadata: MetadataResponse): MetadataModel {
    return metadata as MetadataModel
}