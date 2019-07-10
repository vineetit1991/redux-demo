// @flow

import type { ObjectWithAlphaNumberic } from "../../common.types";

export type Component = {
    [key: string]: string | number,
    props: ObjectWithAlphaNumberic,
    behabiour: ObjectWithAlphaNumberic
}

export type ComponentsState = {|
    byIds: { [key: string]: Component},
    ids: string[],
    selected: string[]
|};

export type MoveComponentPayload = {
    x: number,
    y: number
};

export type ScaleComponentPayload = {
    top: number,
    left: number,
    width: number,
    height: number
};

export type SelectComponentPayload = string;

export type ComponentDataChangePayload = Component;

