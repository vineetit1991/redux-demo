// import * as R from "ramda";
import React from "react";
import "./index.css";

import globalHandlerPubSub from "../globalHandlers";

const mousePositionFromEvent = e =>
    ({ x: e.clientX, y: e.clientY});

export default class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false
        };
        
        const removeMouseUp = globalHandlerPubSub.subscribe("mouseup", _ => this.resetHandle());
        const removeMouseMove = globalHandlerPubSub.subscribe("mousemove", e => this.onDrag(e));

        this.detachEvents = () => {
            removeMouseUp();
            removeMouseMove();
        };
    }

    // attachEvents() {
    //     const resetHandle = () => this.resetHandle();
    //     const onDrag = e => this.onDrag(e);

    //     if (typeof window !== "undefined") {
    //         window.addEventListener("mouseup", resetHandle);
    //         window.addEventListener("mousemove", onDrag);
    //     }

    //     return () => {
    //         if (typeof window !== "undefined") {
    //             window.removeEventListener("mouseup", resetHandle);
    //             window.removeEventListener("mousemove", onDrag);
    //         }
    //     };
    // }

    resetHandle() {
        this.setState({
            isDragging: false
        });
        this.lastMousePosition = null;
    }

    componentWillUnmount() {
        this.detachEvents();
    }

    onMouseDown(e) {
        if (e.button !== 0) return;

        this.lastMousePosition = mousePositionFromEvent(e);
        this.initialTop = this.props.position.top;
        this.initialLeft = this.props.position.left;
        this.onDragStart();
        // if (this.props.onMouseDown) {
        //     this.props.onMouseDown(e);
        // }
    }

    onDragStart() {
        this.setState({ isDragging: true });
    }

    onDrag(e) {
        if (!this.state.isDragging) return;

        if (!this.lastMousePosition) {
            this.lastMousePosition = mousePositionFromEvent(e);
        }

        const mousePosition = mousePositionFromEvent(e);
        const movement = {
            x: this.initialLeft + (mousePosition.x - (this.lastMousePosition.x || 0)),
            y: this.initialTop + (mousePosition.y - (this.lastMousePosition.y || 0))
        }

        this.props.onMove(movement);
        // this.lastMousePosition = mousePosition;
    }

    renderDragHandle() {
        return (
            <div
                className="dragHandle"
                onMouseDown={(e) => this.onMouseDown(e)}
            />
        );
    }

    render() {
        return (
            <div
                style={{
                    zIndex: 999999999,
                    position: "absolute",
                    top: this.props.position.top,
                    left: this.props.position.left,
                    width: this.props.dimension.width,
                    height: this.props.dimension.height,
                    opacity: 0
                }}
                onClick={e => e.stopPropagation()}
                tabIndex="1"
            >
                {this.renderDragHandle()}
            </div>
        );
    }
}