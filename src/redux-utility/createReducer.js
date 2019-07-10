// // @flow
// import type { CreateReducer } from "Redux-Module";

// import components from "../reducers/components/reducer";
// import componentsPanel from "../reducers/componentsPanel/reducer";
// import workspace from "../reducers/workspace/reducer";
// import mcta from "../reducers/mcta/reducer";
// import propertyPanel from "../reducers/propertyPanel/reducer";
// import savePublish from "../reducers/savePublish/reducer";


// // import type { AppState, SubReducer } from "../store/types";
// // // import type { ReducerNames } from "./registery";

// // // type Args<S> = [
// // //     ReducerNames,
// // //     SubReducer<S>
// // // ];

// // const Noop = (a: AppState): Object => a;

// // export function createReducer<Name, state, Props>(
// //         name: Name,
// //         initialState: state,
// //         reducer: SubReducer<state, Props>,
// //         helperFn: ((s: AppState) => Props) = Noop
// //     ) : {|
// //         [a: Name]: state,
// //         reducer: SubReducer<state, Props>,
// //         helperFn: (s: AppState) => Props
// //     |} {
// //     return {
// //         [name]: initialState,
// //         reducer,
// //         helperFn
// //     }
// // };
// export const combineReducer: CreateReducer = (a) => a;

// // export const Reducers = {

// // };

// // export const DependencyList = {

// // };

