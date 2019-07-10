// @flow
export type ComponentsPanelState = {|
    activeComponent: [string, {x: number, y: number }] | null,
    dragging: boolean
|}

export type SelectPanelComponentPayload = {|
    x: number,
    y: number,
    kind: string
|};

export type MoveSortCutIconPayload = {|
    x: number,
    y: number
|};

