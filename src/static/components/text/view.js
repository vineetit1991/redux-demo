import React from 'react';

import EditComponent from "./editMode";
import NonEditable from "./nonEditable";

import "./index.css";

export default (component, style = {}, props) => {
    return props.isTransformationDisabled ?
        <div
            style={{
                ...style,
                fontSize: component.behaviour.size
            }}
        >
            <EditComponent
                component={component}
                style={style}
                {...props}
            />
        </div>
    :
        <NonEditable style={style} component={component} {...props}/>
}

//component Panel
export const shortcut =(left, top) => {
    return <div
        style={{
            top: top - 25,
            left: left - 50,
            width: 100,
            height: 50,
            background: "#00800045",
            border: "1px solid",
            position: "absolute"
        }}
        className="placeholderElement"
    >Text</div>
}