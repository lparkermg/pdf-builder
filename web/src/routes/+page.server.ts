import { env } from '$env/dynamic/private'
import type { MetadataResponse } from "$lib/models/api";
import * as metaapi from "$lib/api/metadata";

export interface MainDataModel {
    apiUri: string
    metadata: MetadataResponse,
    errorMessage: string | undefined,
}

export async function load(): Promise<MainDataModel> {
    const internalUri = env.PDFBUILDER_UI_Api__Internal__Uri;
    const hostUri = env.PDFBUILDER_UI_Host__Uri;

    let errorMessage: string | undefined = undefined;
    const onerror = (e: Error) => {
        errorMessage = e.message;
    };

    const metadata = await metaapi.load(onerror, internalUri, hostUri)

    return {
        apiUri: env.PDFBUILDER_UI_Api__External__Uri,
        metadata,
        errorMessage
    }
}