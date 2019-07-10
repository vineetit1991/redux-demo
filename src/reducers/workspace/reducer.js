// @flow 

import * as R from "ramda";

import {
    SCALE_WORKSPACE,
    SET_POSITION,
    ON_SCROLL,
    UPDATE_WORSKPACE_DIMENSION,
    SHOW_LOADING,
    DATA_LOADED,
} from "./constants";


import type {
    WorkspaceState
} from "./types";

import type {
    Action
} from "./actions";

const initialState = {
    width: 1000,
    height: window.innerHeight,
    top: 0,
    left: 0,
    scrollTop: 0,
    loading: false
};


const fn = (state: WorkspaceState = initialState, action: Action, { components }): WorkspaceState => {
    switch (action.type) {
        case DATA_LOADED:
            return { ...state, loading: false };    

        case SHOW_LOADING:
            return { ...state, loading: true };    

        case SET_POSITION:
            return { ...state, left: action.payload.left, top: action.payload.top };
        
        case SCALE_WORKSPACE:
            return { ...state, width: Math.min(action.payload + state.width, window.innerWidth - 250) };

        case ON_SCROLL:
            return { ...state, scrollTop: action.payload };

        case UPDATE_WORSKPACE_DIMENSION:
            const newWidth = R.pipe(
                R.values,
                R.reduce((totalWidth, comp) => {
                    if (comp.props.left < 0) {
                        totalWidth +=  Math.abs(comp.props.left);
                    }
                    if ((comp.props.left + comp.props.width) > state.width) {
                        let extra = (comp.props.left + comp.props.width) - state.width;
                        totalWidth +=  Math.abs(extra);
                    }
                    return totalWidth;
                }, state.width)
            )(components.byIds)
            
            return { ...state, width: Math.min(newWidth, window.innerWidth - 250), left: state.left - ((newWidth - state.width) / 2) };

        default:
            break;
    }
    return state;
};


export default {
    getDependencies: (state = {}) => {
        return {
            components: state.components
        }
    },
    reducer: fn
}
