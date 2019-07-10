// @flow

import {
    SCALE_WORKSPACE,
    SET_POSITION,
    ON_SCROLL,
    UPDATE_WORSKPACE_DIMENSION,
    SHOW_LOADING,
    DATA_LOADED
} from "./constants";

import type {
    SetPositionPayload,
    ScaleWorkspacePayload,
    OnScrollPayload
} from "./types";

export const setPosition = (payload: SetPositionPayload) => ({ type: SET_POSITION, payload});
export const scaleWorkspace = (payload: ScaleWorkspacePayload) => ({ type: SCALE_WORKSPACE, payload, doSave: true });
export const onScroll = (payload: OnScrollPayload) => ({ type: ON_SCROLL, payload});
export const updateWorkSpaceDimension = () => ({ type: UPDATE_WORSKPACE_DIMENSION });
export const showLoading = () => ({ type: SHOW_LOADING });
export const dataLoaded = () => ({ type: DATA_LOADED });


export type Action =
    ExtractReturn<typeof setPosition> |
    ExtractReturn<typeof scaleWorkspace> |
    ExtractReturn<typeof onScroll> |
    ExtractReturn<typeof showLoading> |
    ExtractReturn<typeof dataLoaded>