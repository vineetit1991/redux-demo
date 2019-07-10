// @flow

import { SET_POSITION, UPDATE_POSITION } from "./constants";
import { getAvailablePosition } from "./utils";

import type { PP } from "./types";
import type { Action } from "./actions";

const initialState = {
    width: 300,
    height: 300,
    top: 50,
    left: 0
};

export default {
    getDependencies: (state = {}) => ({
        mcta: state.mcta,
        workspace: state.workspace,
        selectedComponent: state.components && state.components.selected.length > 0 ? state.components.byIds[state.components.selected[0]] : null
    }),
    reducer: (state: PP = initialState, action: Action, { mcta, selectedComponent, workspace}): PP => {
        switch (action.type) {
            case SET_POSITION:
                if (!selectedComponent) return state;
                return {
                    ...state,
                    top: action.payload.top > (window.innerHeight - 100) ? (window.innerHeight - 100) : Math.max(action.payload.top, 0),
                    left: action.payload.left > (window.innerWidth - workspace.left - state.width - 50) ? 
                            (window.innerWidth - workspace.left - state.width - 50) : Math.max(action.payload.left, -1 * (workspace.left / 2))
                }

            case UPDATE_POSITION:
                if (!selectedComponent) return state;
                const position = getAvailablePosition(mcta, selectedComponent.props, workspace, state);
                return {
                    ...state,
                    top: position.y,
                    left: position.x
                };

            default:
                break;
        }
        return state;
    }
}
