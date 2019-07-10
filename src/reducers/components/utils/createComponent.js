// @flow

import components from "../../../static/components/utils";

//just for testing
let top = 100;
let left = 100;

export default (state, workspace, [ kind, position ], hasPanelComponentMoved) => {
    const def = components.getDef(kind);
    const id = String(Math.random());
    const comp = {
        id,
        kind: def.kind,
        label: def.label,
        name: def.kind === "TEXT" ? "this is some dummy text" : def.name,
        props: {
            ...def.props,
            top: hasPanelComponentMoved ? position.y - workspace.top - 25 : top,
            left: hasPanelComponentMoved ? position.x - workspace.left - 50 : left
        },
        behaviour: def.behaviour
    };

    //just for testing dirty testing
    if (!hasPanelComponentMoved) {
        top += 50;
        left += 40;
    } 

    return {
        ...state,
        ids: state.ids.concat([comp.id]),
        byIds: {
            ...state.byIds,
            [comp.id]: comp
        },
        selected: [comp.id]
    }
}