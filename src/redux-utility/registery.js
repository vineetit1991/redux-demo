// @flow

import * as R from "ramda";
import type { Reducer , InitialState } from "Redux-Module";

import components from "../reducers/components/reducer";
import componentsPanel from "../reducers/componentsPanel/reducer";
import workspace from "../reducers/workspace/reducer";
import mcta from "../reducers/mcta/reducer";
import propertyPanel from "../reducers/propertyPanel/reducer";
import savePublish from "../reducers/savePublish/reducer";

import { unSavedChanges } from "../reducers/savePublish/actions";

import type { PlainAction } from "../store/types";

type RootReducer<S> = (s: S, a: any) => S;

const combineReducers = (reducersWithDependecyMap): RootReducer<RootState> => {

    const combine = (state, action: any) => {
        const nextState = { ...state};
        R.forEachObjIndexed((config, reducerName) => {
            const reducer = config.reducer;
            if (!config.getDependencies) {
                nextState[reducerName] = reducer(
                    state[reducerName],
                    action
                );
            }

            if (config.getDependencies) {
                nextState[reducerName] = reducer(
                    state[reducerName],
                    action,
                    // $FlowFixMe
                    config.getDependencies(state)
                );
            }
            
            if (nextState[reducerName] !== state[reducerName]) {
                console.log(
                    action.type, " ------------- Action changed -------------->  ", reducerName
                );
                console.dirxml("             ", action.payload);
            }
        }, reducersWithDependecyMap);

        if (action.doSave)  {
            return combine(nextState, unSavedChanges());
        }

    // return (nextState: any);

        return nextState;
    };

    return combine;
};

const combineReducerObj = {
    workspace: workspace.reducer,
    savePublish: savePublish.reducer,
    components: components.reducer,
    componentsPanel: componentsPanel.reducer,
    mcta: mcta.reducer,
    propertyPanel: propertyPanel.reducer
};

export type RootState = $Call<InitialState, typeof combineReducerObj>;

export type RootStateWithEmpty = RootState | {||};

export default combineReducers({
    workspace: workspace,
    savePublish: savePublish,
    components: components,
    componentsPanel: componentsPanel,
    mcta: mcta,
    propertyPanel: propertyPanel
});


export const initialState = ((o: typeof reducers) => {
    let rootState = {}
    Object.keys(o).forEach(reducerName => {
        const state = o[reducerName].reducer(undefined, { type: "" }, {});    
        rootState = { ...rootState,  [reducerName]: state };
    });
    return rootState;
})({
    workspace: workspace,
    savePublish: savePublish,
    components: components,
    componentsPanel: componentsPanel,
    mcta: mcta,
    propertyPanel: propertyPanel
});


// // ReducerConfigurations
// export const reducers = {
//     workspace: workspace.reducer,
//     savePublish: savePublish.reducer,
//     components: components.reducer,
//     componentsPanel: componentsPanel.reducer,
//     mcta: mcta.reducer,
//     propertyPanel: propertyPanel.reducer
// };



// declare function getDependencies (s: RootState): any;
// export const dependeciesList = {
//     workspace: workspace.getDependencies,
//     savePublish: savePublish.getDependencies,
//     components: components.getDependencies,
//     mcta: mcta.getDependencies,
//     propertyPanel: propertyPanel.getDependencies
// };




// //==========================================================================================================//

// export const initialState = ((o: typeof reducers) => {
//     let rootState = {}
//     Object.keys(o).forEach(reducerName => {
//         const state = o[reducerName](undefined, { type: "" }, {});    
//         rootState = { ...rootState,  [reducerName]: state };
//     });
//     return rootState;
// })(reducers);

// export const combineReducers = ((reducersMap, dependencies = {}) => {
//     const combine = (state: RootState, action: PlainAction): RootState => {
//         let nextState = { ...state };

//         R.forEachObjIndexed((reducer, reducerName) => {
//             const getDependencies = dependencies[reducerName];
//             nextState[reducerName] = reducer(
//                 state[reducerName],
//                 action,
//                 getDependencies ? getDependencies(state) : null
//             );

//             if (nextState[reducerName] !== state[reducerName]) {
//                 console.log(
//                     action.type, " ------------- Action changed -------------->  ", reducerName
//                 );
//                 console.dirxml("             ", action.payload);
//             }
//         }, reducersMap);

//         if (action.doSave)  {
//             return combine(nextState, unSavedChanges());
//         }

//         return (nextState: any);
//     }

//     return combine;
// })(reducers, dependeciesList);

