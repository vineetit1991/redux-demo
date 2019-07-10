import React from 'react';
import pubSub from "../../../components/globalHandlers";
import ClickListener from "../../../components/clickListener";

export default class ComponentWrapper extends React.Component {
    constructor() {
        super();
        this.customCanvasActions = [];
        this.detachEvents = pubSub.subscribe("mouseup", () => {
            this.props.onComponentHoldToggle(false)
        });
    }

    componentWillUnmount() {
        this.detachEvents();
    }

    // attachEvents() {
    //     const resetHold = () => {
    //         ;
    //     };

    //     if (typeof window !== "undefined") {
    //         window.addEventListener("mouseup", resetHold);
    //     }

    //     return () => {
    //         if (typeof window !== "undefined") {
    //             window.removeEventListener("mouseup", resetHold);
    //         }
    //     };
    // }

    render() {
        const { component, componentDef, onComponentSelected, holdingComponent} = this.props;       
        return (
            <ClickListener
                onClickOutside={e => {
                    this.props.onInteractionEnd();
                }}
                reference={"componentoutsideclickdetection"}
            >
                <div
                    className="componentWrapper"
                    key={component.id}
                >
                    <div
                        style={{
                            top: component.props.top,
                            left: component.props.left,
                            width: component.props.width,
                            height: component.props.height,
                            position: "absolute",
                            pointerEvents: "none",
                            zIndex: 100 + 1 //
                        }}
                    />
                    <div
                        style={{
                            position: "relative",
                            zIndex: 10 // should be increamented
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            onComponentSelected(component.id);
                        }}
                        onMouseUp={() => {
                            this.props.onComponentHoldToggle(false);
                        }}
                        onMouseDown={e => {
                            if (e.button !== 0) return;
                            onComponentSelected(component.id);
                            this.props.onComponentHoldToggle(true);
                        }}
                        onDoubleClick={() => this.props.onInteractionStart()}
                        onContextMenu={e => {
                            e.persist();
                            e.preventDefault();
                        }}
                    >
                        { componentDef.view(component, {
                            top: component.props.top,
                            left: component.props.left,
                            width: component.props.width,
                            height: component.props.height,
                            position: "absolute"
                        }, {
                            holdingComponent,
                            onComponentDataChange: (a) => this.props.onComponentDataChange(a),
                            onInteractionStart: () => this.props.onInteractionStart(),
                            onInteractionEnd: () => this.props.onInteractionEnd(),
                            isTransformationDisabled: this.props.isTransformationDisabled &&
                                this.props.selectedComponents.length > 0 && this.props.selectedComponents[0] === component.id 
                        }) }
                    </div>
                </div>
            </ClickListener>
        );
    }
}