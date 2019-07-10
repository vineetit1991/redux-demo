import React from 'react';
import Measure from 'react-measure'
import { connect } from 'react-redux';

import { setWidth } from "../../../reducers/mcta/actions";
import { updatePosition } from "../../../reducers/propertyPanel/actions";
import components from "../../../static/components/utils";

import {sequenceActions} from "../../../redux-utility/sequence";

import "./index.css";

const MCTACiew = ({ component, selectedByDoubleClick, interaction, onComponentDataChange, ownProps, dispatch }) => {
    const def = component ? components.getDef(component.kind) : null;
    if (!def) return null;

    return <Measure
        bounds
        scroll
        onResize={contentRect => {
            dispatch(sequenceActions([
                setWidth(contentRect.bounds.width),
                updatePosition()
            ]))
        }}
        >
            {({ measureRef }) => <div className="mctaHolder"
                ref={measureRef}
                key={component.id}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                style={{
                    zIndex: 99999999,
                    ...ownProps,
                    width: "auto"
                }}
            >
            {def.mcta(
                component,
                selectedByDoubleClick,
                interaction,
                onComponentDataChange
            )}
            </div>}
    </Measure>
}


function mapStateToProps(state) {
    const { components, mcta } = state;
    return {
        ownProps: mcta,
        component: components.selected.length > 0 ? components.byIds[components.selected[0]] : null
    };
}

export default connect(mapStateToProps)(MCTACiew);