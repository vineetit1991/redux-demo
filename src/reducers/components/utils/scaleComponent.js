// @flow

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
                    top: payload.top,
                    left: payload.left,
                    width: payload.width,
                    height: Math.max(comp.props.minHeight || 0, payload.height)
                }
            }
        }
    };
}