// @flow

import { UNSAVED_CHANGES, SAVING, SAVE_COMPLETED } from "./constants";


export const unSavedChanges = () => ({ type: UNSAVED_CHANGES });
export const saving = () => ({ type: SAVING });
export const saveCompleted = () => ({ type: SAVE_COMPLETED });


export type Action =
    ExtractReturn<typeof unSavedChanges> |
    ExtractReturn<typeof saving> |
    ExtractReturn<typeof saveCompleted>