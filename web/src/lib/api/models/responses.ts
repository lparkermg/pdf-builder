export interface MetadataItemResponse {
    title: string,
    id: string,
    lastModifiedAt: string,
}

export interface MetadataResponse {
    metadata: MetadataItemResponse[];
}

export interface CvLoadResponse {
    id: string;
    content: string;
}