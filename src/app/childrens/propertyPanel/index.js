import React from 'react';
import { connect } from 'react-redux';

import { setPosition } from "../../../reducers/propertyPanel/actions";
import { updatePosition } from "../../../reducers/mcta/actions";
import components from "../../../static/components/utils";
import Draggable from "../../../components/draggable";

import "./index.css";
import {sequenceActions} from "../../../redux-utility/sequence";

class PropertyPanel extends React.Component {
    onMove(position) {
        this.props.dispatch(
            sequenceActions([
                setPosition({
                    top: position.y,
                    left: position.x
                }),
                updatePosition()
            ])  
        );
    }


    renderMeasureView() {
        const {component} = this.props;

        const def = component ? components.getDef(component.kind) : null;
        if (!def) return null;

        return <div
            className="propertiesPanelTop"
            key="propertiesPanelTop"
            style={{
                top: this.props.top,
                left: this.props.left,
                width: this.props.width,
                height: this.props.height
            }}
        >
        {
            def.pp(
                this.props.component,
                this.props.selectedByDoubleClick,
                this.props.interaction,
                this.props.onComponentDataChange
            )
        }
        </div>;
    }

    render() {
        return [
            this.renderMeasureView()
        ].concat(<Draggable
            key="draggablePropertiesPanelTop"
            position={{
                top: this.props.top,
                left: this.props.left
            }}
            dimension={{
                width: this.props.width,
                height: this.props.height
            }}
            onMove={a => this.onMove(a)}
        />)
    }
}

function mapStateToProps(state) {
    const { propertyPanel, components } = state;
    return {
        ...propertyPanel,
        component: components.selected.length > 0 ? components.byIds[components.selected[0]] : null
    };
}

export default connect(mapStateToProps)(PropertyPanel);
