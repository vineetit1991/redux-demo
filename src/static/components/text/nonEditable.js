import React from 'react';
import Measure from 'react-measure'

export default class NonEditable extends React.Component {
    render() {
        const {component, onComponentDataChange, style} = this.props;
        return <div
            className="textNonEdit"
            style={{
                ...style,
                fontSize: component.behaviour.size
            }}
        >
            <Measure
                bounds
                scroll
                onResize={contentRect => {
                    if (this.props.holdingComponent) {
                        return;
                    };
                    onComponentDataChange({
                        props: {
                            ...component.props,
                            minHeight: contentRect.bounds.height,
                            height: contentRect.bounds.height
                        }
                    })
                }}
                >
                    {({ measureRef }) => <div
                        className="hiddenDiv"
                        style={{
                            maxWidth: style.width,
                            minHeight: component.props.minHeight
                        }}
                        ref={measureRef}
                        dangerouslySetInnerHTML={{
                            __html: component.name
                        }} 
                    />}
            </Measure>
            <div
                className="nonEditableChild"
                dangerouslySetInnerHTML={{
                    __html: component.name
                }} 

            />
        </div>;
    }
}