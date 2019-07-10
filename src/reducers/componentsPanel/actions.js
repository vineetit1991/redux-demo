// @flow

import {
    SELECT_ELEMENT,
    MOVE_SORTCUT_ICON,
    ELEMENT_DROPPED
} from "./constants";

import type {
    SelectPanelComponentPayload,
    MoveSortCutIconPayload
} from "./types";

export const selectPanelComponent = (payload: SelectPanelComponentPayload) => ({ type: SELECT_ELEMENT, payload});
export const moveSortCutIcon = (payload: MoveSortCutIconPayload) => ({ type: MOVE_SORTCUT_ICON, payload});
export const elementDropped = () => ({ type: ELEMENT_DROPPED });


export type Actions =
    ExtractReturn<typeof selectPanelComponent> |
    ExtractReturn<typeof moveSortCutIcon> |
    ExtractReturn<typeof elementDropped>


