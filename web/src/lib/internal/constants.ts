import type { CvModel } from "./models"

export const CV_EVENTS = {
    LOAD_CV: "load_cv",
    DELETE_CV: "delete_cv",
    SAVE_CV: "save_cv",
    CV_TITLE_UPDATED: "cv_title_updated"
}

export const EMPTY_CV: CvModel = {
    template: 0,
    theme: 0,
    content: [],
    sidebar: []
}