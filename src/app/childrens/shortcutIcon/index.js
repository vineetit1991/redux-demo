import React from 'react';
import pubSub from "../../../components/globalHandlers";
import { connect } from 'react-redux';
import components from "../../../static/components/utils";
import {sequenceActions} from "../../../redux-utility/sequence";

import {
    dropComponent,
    resetSelectedElements
} from "../../../reducers/components/actions";

import {
    moveSortCutIcon,
    elementDropped
} from "../../../reducers/componentsPanel/actions";

import "./index.css";

 class ShortcutIcon extends React.Component<{}> {
    constructor() {
        super();
        this.removeMouseMove = pubSub.subscribe("mousemove", (e) => {
            if (!this.props.activeComponent.kind) return;
            this.props.dispatch(sequenceActions([
                resetSelectedElements(),
                moveSortCutIcon({ x: e.clientX, y: e.clientY })
            ]))
        });
        this.removeMouseUp = pubSub.subscribe("mouseup", (e) => {
            if (!this.props.activeComponent.kind) return;
            this.props.dispatch(sequenceActions(
                [
                    dropComponent(),
                    elementDropped()
                ]
            ))
        });
    }

    componentWillUnmount() {
        this.removeMouseMove();
        this.removeMouseUp();
    }

    render() {
        const { activeComponent , dragging } = this.props;
        const def = activeComponent ? components.getDef(activeComponent.kind) : null;
        return dragging && def ? def.shortcut(activeComponent.position.x, activeComponent.position.y) : null
    }
}

function mapStateToProps(state) {
    const { componentsPanel } = state;
    return {
        activeComponent: {
            kind: componentsPanel.activeComponent ? componentsPanel.activeComponent[0] : null,
            position: componentsPanel.activeComponent ? componentsPanel.activeComponent[1] : null
        },
        dragging: componentsPanel.dragging
    };
}

export default connect(mapStateToProps)(ShortcutIcon);