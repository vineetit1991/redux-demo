//@flow
import type {
    SetPositionPayload,
    SetWidthPayload
} from "./types";

import {
    SET_WIDTH,
    SET_POSITION,
    UPDATE_POSITION
} from "./constants";


export const setWidth = (payload: SetWidthPayload) => ({ type: SET_WIDTH, payload });
export const setPosition = (payload: SetPositionPayload) => ({ type: SET_POSITION, payload });
export const updatePosition = (payload?: boolean) => ({ type: UPDATE_POSITION, payload });


export type Action =
    ExtractReturn<typeof setWidth> |
    ExtractReturn<typeof setPosition> |
    ExtractReturn<typeof updatePosition>;