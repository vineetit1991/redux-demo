// @flow

import {
    UNSAVED_CHANGES,
    SAVING,
    SAVE_COMPLETED
} from "./constants";


import type {
    SavePublishState
} from "./types";

import type {
    Action
} from "./actions";

const initialState = {
    saveRequired: false,
    saving: false
};

export default {
    getDependencies: (rootState = {}) => ({ components: rootState.components }),
    reducer: (state: SavePublishState = initialState, action: Action, { components }): SavePublishState => {
        switch (action.type) {
            case SAVING:
                return { ...state, saving: true, saveRequired: false }

            case UNSAVED_CHANGES:
                return { ...state, saveRequired: true }

            case SAVE_COMPLETED:
                return { ...state, saving: false }

            default:
                break;
        }
        return state;
    }
}