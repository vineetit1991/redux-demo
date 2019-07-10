// @flow

import type { RootState } from "../redux-utility/registery";
// import type { ComponentsPanelStateWithName } from "../reducers/componentsPanel/types";
// import type { MCTAWithName } from "../reducers/mcta/types";
// import type { PPStateWithName } from "../reducers/propertyPanel/types";
// import type { SavePublishStateWithName } from "../reducers/savePublish/types";
// import type { WorkspaceStateWithName } from "../reducers/workspace/types";

// export type AppState = ComponentsStateWithName & ComponentsPanelStateWithName & MCTAWithName & PPStateWithName & SavePublishStateWithName & WorkspaceStateWithName;

export type PlainAction = {
    type: string;
    payload?: any;
    doSave?: boolean;
}
export type SequenceAction = {|
    type: "sequence Actions",
    sequence: true,
    payload: Array<PlainAction>
|}
export type AsyncActions = {|
    type: "Asynchronus Actions",
    aync: true,
    payload: Array<PlainAction | ThunkAction>
|}
export type Action = PlainAction | SequenceAction | AsyncActions;
export type Actions = Action | ThunkAction ;


export type GetState = () => RootState;

export type Dispatch = (action: Action | ThunkAction ) => any;

// export type RootReducer = (state: AppState, action: Action ) => AppState;

// export type SubReducer<S, Props> = (state: S, action: PlainAction, Props) =>  S

export type ThunkAction = ({dispatch: Dispatch, getState: GetState}) => any;


