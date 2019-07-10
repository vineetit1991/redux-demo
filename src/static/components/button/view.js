import React from 'react';
import "./index.css";

export default (button, style = {}) => {
    return <div
        className="button"
        style={style}
    >
        {button.name}
    </div>;

}


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
    >Button</div>
}