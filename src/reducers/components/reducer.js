//@flow

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

import type {RootStateWithEmpty} from "../../redux-utility/registery";

import createComponent from "./utils/createComponent";
import moveComponent , {correctComponentDimension} from "./utils/moveComponent";
import scaleComponent from "./utils/scaleComponent";
import pushComponents from "./utils/pushComponents";

import type { ComponentsState } from "./types.js";
import type { Actions } from "./actions";

const initialState: ComponentsState = {
    byIds: {},
    ids: [],
    selected: []
};

const fn = (state: ComponentsState = initialState, action: Actions, { workspace, activeComponent, hasPanelComponentMoved }: Object): ComponentsState => {
    switch (action.type) {
        case ON_COMPONENT_SCALE:
            return scaleComponent(state, action.payload, workspace);

        case DROP_COMPONENT:
            if (activeComponent) {
                return createComponent(state, workspace, activeComponent, hasPanelComponentMoved);
            }
            return state;

        case SELECT_COMPONENT:
            return { ...state, selected: [action.payload] }

        case ON_COMPONENT_MOVE:
            return moveComponent(state, action.payload, workspace);

        case RESET_SELECTED_COMPONENTS:
            return { ...state, selected: [] }

        case COMPONENT_DATA_CHANGE:
            if (state.selected.length === 0) return state; // here you will write logic

            let newComponent = { ...state.byIds[state.selected[0]], ...action.payload };

            const oldHeight = state.byIds[state.selected[0]].props.height;
            const newHeight = newComponent.props.height;
            
            const diff = newHeight - oldHeight;
            if (diff !== 0) {
                return { ...state, byIds:pushComponents(diff, state.byIds, newComponent) };
            }
            
            return { ...state, byIds: { ...state.byIds, [state.selected[0]]: newComponent } }

        case CORRECT_COMPONNENT_POSITION:
            return { ...state, byIds: correctComponentDimension(state.byIds)};


        case SAVE_COMPONENT_DATA:
            return { ...action.payload, selected: []};
        
        default:
            return state;
    }
}

export default {
    reducer: fn,
    getDependencies: (state: RootStateWithEmpty = {}) => ({
        workspace: state.workspace && state.workspace,
        activeComponent: state.componentsPanel && state.componentsPanel.activeComponent,
        hasPanelComponentMoved: state.componentsPanel && !!state.componentsPanel.dragging
    }),
};