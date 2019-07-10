// @flow 

import {
    SELECT_ELEMENT,
    MOVE_SORTCUT_ICON,
    ELEMENT_DROPPED
} from "./constants";

import type { Actions } from "./actions";
import type { ComponentsPanelState } from "./types.js";

const initialState = {
    activeComponent: null,
    dragging: false
};

export default {
    reducer: (state: ComponentsPanelState = initialState, action: Actions): ComponentsPanelState => {
        switch (action.type) {
            case SELECT_ELEMENT:
                return { ...state, activeComponent: [action.payload.kind, { x: action.payload.x, y: action.payload.y }]};

            case MOVE_SORTCUT_ICON:
                if (!state.activeComponent) return state;
                return {
                    ...state,
                    dragging: true,
                    activeComponent: [
                        state.activeComponent[0],
                        {
                            x: Math.min(Math.max(action.payload.x, 0), window.innerWidth - 55),
                            y: Math.min(Math.max(action.payload.y, 70), window.innerHeight - 28),
                        }
                    ]
                };

            case ELEMENT_DROPPED:
                return {
                        ...state,
                        dragging: false,
                        activeComponent: null
                    };

            default:
                break;
        }
        return state;
    }
}