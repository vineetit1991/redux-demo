import React from 'react';
import { connect } from 'react-redux';

import {
    selectPanelComponent
} from "../../../reducers/componentsPanel/actions";
import components from "../../../static/components";

import "./index.css";

const LeftPanel = ({ dispatch }) => {
    return <div className='leftPanel'>
        {
            components.map(component => <div
                key={component.kind}
                onClick={(e) => {

                }}
                onMouseDown={(e) => {
                    dispatch(selectPanelComponent({
                        kind: component.kind,
                        x: e.currentTarget.getBoundingClientRect().left,
                        y: e.currentTarget.getBoundingClientRect().top
                    }));
                }}
                className="element"
            >
                {component.name}
            </div>)
        }
    </div>;
}

function mapStateToProps(state: RootState) {
    const { componentsPanel } = state;
    return {
        componentsPanel
    };
}

export default connect(mapStateToProps)(LeftPanel);