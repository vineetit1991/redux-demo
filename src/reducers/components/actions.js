// @flow

import {
    ON_COMPONENT_MOVE,
    ON_COMPONENT_SCALE,
    DROP_COMPONENT,
    SELECT_COMPONENT,
    RESET_SELECTED_COMPONENTS,
    COMPONENT_DATA_CHANGE,
    CORRECT_COMPONNENT_POSITION,
    SAVE_COMPONENT_DATA
} from "./constants";

import type {
    MoveComponentPayload,
    ScaleComponentPayload,
    SelectComponentPayload,
    ComponentDataChangePayload,
    ComponentsState
} from "./types.js";


export const onComponentMove = (payload: MoveComponentPayload) => ({ type: ON_COMPONENT_MOVE, payload, doSave: true });
export const onComponentScale = (payload: ScaleComponentPayload) => ({ type: ON_COMPONENT_SCALE, payload, doSave: true });
export const dropComponent = () => ({ type: DROP_COMPONENT, doSave: true });
export const selectComponent = (payload: SelectComponentPayload) => ({ type: SELECT_COMPONENT, payload });
export const resetSelectedElements = () => ({ type: RESET_SELECTED_COMPONENTS });
export const componentDataChange = (payload: ComponentDataChangePayload) => ({ type: COMPONENT_DATA_CHANGE, payload, doSave: true });
export const correctComponentPosition = () => ({ type: CORRECT_COMPONNENT_POSITION, doSave: true });
export const saveComponentData = (payload: ComponentsState) => ({ type: SAVE_COMPONENT_DATA, payload });




//Temporary action just to check 
// export const globalStyleChangeFontSizeChange = actionCreator('@@components/globalStyleChangeFontSizeChange');


export type Actions =
    ExtractReturn<typeof onComponentMove> |
    ExtractReturn<typeof onComponentScale> |
    ExtractReturn<typeof dropComponent> |
    ExtractReturn<typeof selectComponent> |
    ExtractReturn<typeof resetSelectedElements> | 
    ExtractReturn<typeof componentDataChange> |
    ExtractReturn<typeof correctComponentPosition> |
    ExtractReturn<typeof saveComponentData>