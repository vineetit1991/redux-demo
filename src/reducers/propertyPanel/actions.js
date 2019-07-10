// @flow

import type { SetPositionPayload } from "./types";
import {
    SET_POSITION,
    UPDATE_POSITION
} from "./constants";


export const setPosition = (payload: SetPositionPayload) => ({ type: SET_POSITION, payload });
export const updatePosition = () => ({ type: UPDATE_POSITION });


export type Action =
    ExtractReturn<typeof setPosition> |
    ExtractReturn<typeof updatePosition>;