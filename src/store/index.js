// @flow 
import { createStore, applyMiddleware } from 'redux';
import combineReducers, {initialState } from "../redux-utility/registery";
import type { RootState } from "../redux-utility/registery";
import {sequence} from "../redux-utility/sequence";

import type { GetState, Dispatch , PlainAction} from "./types";

const iS: RootState = initialState;

const aynchMiddleware = ({ getState , dispatch }: { +getState: GetState , dispatch: Dispatch }) => {
    return next => action => {
        if (action && action.aync && Array.isArray(action.payload)) {
           action.payload.forEach((action) => {
                dispatch((action));
            });
            return;
        } else if (typeof action === "function") {
            return action({dispatch, getState});
        }

        return next(action)
      }
}


const store = createStore(
    sequence(combineReducers),
    iS,
    applyMiddleware(aynchMiddleware)
);

const next = store.dispatch
store.dispatch = function dispatchAndLog(action) {
    if (action && action.type !== "@@global/MOUSE_MOVE") {
        console.group();
        console.log("actionactionactionaction", action);
    }
    let result = next(action);
    return result
}

const consoleSubscribe = () => {
    console.log("\nView Re-render\n");
    console.groupEnd();
};

store.subscribe(consoleSubscribe)

window.store = store;

export default store;