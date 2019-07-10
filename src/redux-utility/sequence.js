// @flow

import type { SequenceAction, AsyncActions, PlainAction } from "../store/types";
import type { RootState } from "./registery";
import { combineReducers } from "./registery";
//batched action code:- taken from open source
export const sequenceActions = (actions: SequenceAction) => {
	return {type: "sequence Actions", sequence: true, payload: actions}
}

export const asyncActions = (actions: AsyncActions) => {
	return {type: "sequence Actions", aync: true, payload: actions}
}


export function sequence(rootReducer: typeof combineReducers) {
	const recursiveR = (state: RootState, action: PlainAction | SequenceAction) => {
		if (action && action.sequence && Array.isArray(action.payload)) {
			console.log("sequence  actions:-");
			return ((action.payload: any): Array<PlainAction | SequenceAction>).reduce(recursiveR, state);
		}
		return rootReducer(state, ((action: any): PlainAction) );
	}
	return recursiveR;
}