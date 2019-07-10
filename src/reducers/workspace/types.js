// @flow
// import type { WorkspaceReducerName } from "./constants";

export type WorkspaceState = {|
    width: number,
    height: number,
    top: number,
    left: number,
    scrollTop: number,
    loading: boolean
|}

// export type WorkspaceStateWithName = {|
//     [WorkspaceReducerName]: WorkspaceState
// |}

export type SetPositionPayload = {|
    top: number,
    left: number
|};

export type ScaleWorkspacePayload = number;

export type OnScrollPayload = number;