// @flow

import {
    SET_WIDTH,
    SET_POSITION,
    UPDATE_POSITION
} from "./constants";

import {getMCTAPosition, adjustMCTA} from "./utils";

import type { MCTA } from "./types.js";
import type { Action } from "./actions";


const initialState = {
    width: 0,
    height: 40,
    top: 0,
    left: 0
};

const fn = (state: MCTA = initialState , action: Action, { workspaceScrollTop, selectedComponent, workspaceLeft, propertyPanel}): MCTA=> {
    switch (action.type) {
        case SET_POSITION:
            return { ...state, left: action.payload.left, top: action.payload.top };

        case SET_WIDTH:
            if (!selectedComponent) return state;
            return {
                ...state,
                width: action.payload,
                ...getMCTAPosition(action.payload, workspaceScrollTop, window.innerWidth - workspaceLeft, selectedComponent.props)
            };

        case UPDATE_POSITION:
            if (!selectedComponent) return state;

            return {
                ...state,
                ...adjustMCTA(
                    state,
                    selectedComponent.props,
                    workspaceScrollTop,
                    window.innerWidth - workspaceLeft,
                    !action.payload ? propertyPanel : { left: 0 , top: 0, width: 0, height: 0}
                )
            };
        
        default:
            break;
    }
    return state;
};

export default {
    reducer: fn,
    getDependencies: (state = {}) => ({
        propertyPanel: state.propertyPanel || {},
        workspaceLeft: state.workspace ? state.workspace.left : 0,
        workspaceScrollTop: state.workspace ? state.workspace.scrollTop : 0,
        selectedComponent: state.components && state.components.selected.length > 0 ? state.components.byIds[state.components.selected] : null
    }),
}