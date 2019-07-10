// @flow

import * as R from "ramda";

export default (state, payload, workspace) => {
    const comp = state.byIds[state.selected[0]];
    return {
        ...state,
        byIds: {
            ...state.byIds,
            [comp.id]: {
                ...comp,
                props: {
                    ...comp.props,
                    top: comp.props.top + payload.y,
                    left: comp.props.left + payload.x
                }
            }
        }
    };
}


export const correctComponentDimension = (byIds) => {
    return R.mapObjIndexed((comp, key) => {
        return {
            ...comp,
            props: {
                ...comp.props,
                top: Math.max(comp.props.top, 0),
                left: Math.min(Math.max(comp.props.left, 0), (window.innerWidth - 250) - comp.props.width)
            }}
    }, byIds);
}