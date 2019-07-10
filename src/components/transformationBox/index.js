import * as R from "ramda";
import React from "react";
import "./index.css";

const DirectionStrings = [
    "top",
    "topLeft",
    "topRight",
    "bottom",
    "bottomLeft",
    "bottomRight",
    "left",
    "right"
];

const DirectionStringsObj = DirectionStrings.reduce((o, k) => {
    o[k] = k;
    return o;
}, {});


const inRectangle = R.curry((position, size, point) => {
    const bottomRight = {
        x: position.x + size.x,
        y: position.y + size.y
    };

    return (
        point.x >= position.x &&
        point.y >= position.y &&
        point.x < bottomRight.x &&
        point.y < bottomRight.y
    );
});

// const magnitude = (x, y) => Math.sqrt(x * x + y * y);

const mousePositionFromEvent = e =>
    ({ x: e.clientX, y: e.clientY});

export default class FreeTransformBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDraggable: true,
            isScaling: false,
            isDragging: props.isHolding
        };

        let a = this.setState.bind(this);

        this.setState = (args) => {
            console.log('%c Component Name: ' 
                + this._reactInternalFiber.elementType.name
                + "       set state called with payload ===> " + JSON.stringify(args) + "\n",
                'font-size: 10px; color: blue'
            );
            a(args);
        }
    
        this.startX = 0;
        this.startY = 0;
        this.initialHeight = 0;
        this.initialWidth = 0;
        this.initialTop = 0;
        this.initialLeft = 0;
        this.aspectRatio = 1;
        this.moveTo = "";
        this.mouseOnDragStart = { x: 0, y: 0 };
        this.detachEvents = this.attachEvents();
        this.minWidth = this.props.minWidth || 50;
        this.minHeight = this.props.minHeight || 50;
    }

    componentWillMount() {
        this.initialHeight = this.props.dimensions.y;
        this.initialWidth = this.props.dimensions.x;
        this.initialTop = this.props.position.y;
        this.initialLeft = this.props.position.x;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isDragging: this.state.isDragging || (this.state.isDraggable && nextProps.isHolding)
        });
        this.minWidth = this.props.minWidth;
        this.minHeight = this.props.minHeight;
    }


    attachEvents() {
        const resetHandle = () => this.resetHandle();
        const onScale = e => this.onScale(e);
        const onDrag = e => this.onDrag(e);
        const onKeyDown = e => this.onKeyDown(e);
        const onKeyUp = e => this.onKeyUp();

        if (typeof window !== "undefined") {
            window.addEventListener("mouseup", resetHandle);
            window.addEventListener("mousemove", onScale);
            window.addEventListener("mousemove", onDrag);
            window.addEventListener("keydown", onKeyDown);
            window.addEventListener("keyup", onKeyUp);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("mouseup", resetHandle);
                window.removeEventListener("mousemove", onScale);
                window.removeEventListener("mousemove", onDrag);
                window.removeEventListener("keydown", onKeyDown);
                window.removeEventListener("keyup", onKeyUp);
            }
        };
    }

    onScaleStart(e, d) {
        if (this.wrapper) {
            // const wrapper = this.wrapper;
            this.startX = e.clientX;
            this.startY = e.clientY;

            this.lastMousePosition = mousePositionFromEvent(e);
            this.currentActive = d;

            this.initialHeight = R.clamp(
                this.minHeight,
                Number.MAX_SAFE_INTEGER,
                this.props.dimensions.y
            );

            this.initialWidth = this.props.dimensions.x;
            this.initialTop = this.props.position.y;
            this.initialLeft = this.props.position.x;

            if (this.props.preserveAspectRatio) {
                this.aspectRatio = this.initialWidth / this.initialHeight;
            }

            this.setState({ isScaling: true });
            this.props.onScaleStart();
        }
    }

    setDraggable(val) {
        if (!this.state.isScaling)
            this.setState({ isDraggable: val });
    }

    onKeyDown(e) {
        if (e.target.tagName === "BODY" && this.props.isSelected) {
            e.stopPropagation();
            this.onArrowPress(e);
        }
    }

    onKeyUp() {
        if (!this.props.isSelected) return;
        this.setState({
            isScaling: false,
            isDraggable: true,
            isDragging: false
        });
        this.props.onComponentHoldToggle(false)
    }



    onScale(e) {
        if (!this.state.isScaling) return;
        if (!this.lastMousePosition) return;

        const self = this;
        const mousePosition = mousePositionFromEvent(e);

        let { x: deltaX, y: deltaY } = {
            x:  mousePosition.x - (this.lastMousePosition.x || 0),
            y:  mousePosition.y - (this.lastMousePosition.y || 0) 
        };
        
        this.minTop = this.initialHeight - this.minHeight;
        this.minLeft = this.initialWidth - this.minWidth;

        let width = this.initialWidth;
        let height = this.initialHeight;
        let top = this.initialTop;
        let left = this.initialLeft;

        switch (self.currentActive) {
            case DirectionStringsObj.top:
                height = height - deltaY;
                
                //handle aspect ratio 
                top += deltaY;
                break;
            
            case DirectionStringsObj.topLeft:
                width = width - deltaX;
                height = height - deltaY;

                top += deltaY;
                left += deltaX;
                break;

            case DirectionStringsObj.topRight:
                width = width + deltaX;
                height = height - deltaY;

                top += deltaY;

                break;
            case DirectionStringsObj.bottom:
                height = height + deltaY

                break;
            case DirectionStringsObj.bottomLeft:
                width = width - deltaX;
                height = height + deltaY;

                left += deltaX;

                break;
            case DirectionStringsObj.bottomRight:
                width = width + deltaX;
                height = height + deltaY;

                break;
            case DirectionStringsObj.left:
                width = width - deltaX;
                left += deltaX;

                break;
            case DirectionStringsObj.right:
                width = width + deltaX;

                break;
            default:
        }

        height = height < this.minHeight ? this.minHeight : height;
        width = width < this.minWidth ? this.minWidth : width;

        
        self.props.onScale({ width, height, left, top });
    }


    resetHandle() {
        this.setState({
            isScaling: false,
            isDraggable: true,
            isDragging: false
        });
        this.moveTo = "";
        this.lastMousePosition = null;
    }

    componentWillUnmount() {
        this.detachEvents();
    }

    onMouseDown(e) {
        if (e.button !== 0) return;
        const mousePosition = mousePositionFromEvent(e);
        
        if (!inRectangle(
                this.props.position,
                this.props.dimensions,
                {
                    x: mousePosition.x - this.props.containerPosition.x,
                    y: mousePosition.y - this.props.containerPosition.y
                }
            )
        ) {
            return;
        }
        
        // this.initialTop = this.props.position.y;
        // this.initialLeft = this.props.position.x;

        // this.parentDelta = 0;

        this.lastMousePosition = mousePosition;
        this.onDragStart();
        if (this.props.onMouseDown) {
            this.props.onMouseDown(e);
        }
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    onDragStart() {
        if (!this.state.isDraggable) return;
        this.setState({ isDragging: true });
    }



    // onDrag(e) {
    //     if (!this.state.isDragging) return;

    //     if (!this.lastMousePosition) {
    //         this.lastMousePosition = mousePositionFromEvent(e);
    //     }

    //     const mousePosition = mousePositionFromEvent(e);
    //     const movement = {
    //         x: this.initialLeft + (mousePosition.x - (this.lastMousePosition.x || 0)),
    //         y: this.initialTop + (mousePosition.y - (this.lastMousePosition.y || 0))
    //     }

    //     if (movement.x < 0 && Math.abs(this.parentDelta) <= Math.abs(movement.x)) {
           
    //         // this.initialParentWidth + 
    //         // this.props.onMove({
    //         //     ...movement,
    //         //     x: 0
    //         // });
    //         let finalDelta = Math.abs(Math.abs(movement.x) - Math.abs(this.parentDelta));
    //         this.parentDelta = Math.abs(movement.x);
    //         console.log("movement.x", Math.abs(finalDelta));
    //         this.props.onScaleParent({
    //             x: Math.abs(this.parentDelta)
    //         });
    //     } else {
    //         this.props.onMove(movement);
    //     }
    //     // this.lastMousePosition = mousePosition;
    // }

    onDrag(e) {
        if (!this.state.isDragging) return;

        if (!this.lastMousePosition) {
            this.lastMousePosition = mousePositionFromEvent(e);
        }

        const mousePosition = mousePositionFromEvent(e);
        const movement = {
            x: mousePosition.x - (this.lastMousePosition.x || 0),
            y: mousePosition.y - (this.lastMousePosition.y || 0)

        }

        // this.props.onMove(movement);

        if (this.moveTo === "") {
            const movementX = Math.abs(movement.x);
            const movementY = Math.abs(movement.y);
            this.moveTo =
                movementX > movementY
                    ? movementX > 1 ? "X" : ""
                    : movementY > 1 ? "Y" : "";
        }

        if (e.shiftKey && this.moveTo === "X") {
            this.props.onMove({ x: movement.x, y: 0})
        } else if (e.shiftKey && this.moveTo === "Y") {
            this.props.onMove({ y: movement.y, x: 0});
        } else if (!e.shiftKey) {
            this.props.onMove(movement);
        }

        this.lastMousePosition = mousePosition;
    }



    renderAnchors() {
        return DirectionStrings.map(d => {
            let classH = `dragHandle-${d}`;
            return (
                <div key={d} onClick={e => e.stopPropagation()}>
                    <div
                        onMouseDown={e => this.onScaleStart(e, d)}
                        onMouseOver={() => this.setDraggable(false)}
                        onMouseOut={() => this.setDraggable(true)}
                        className={classH}
                    />
                </div>
            );
        });
    }


    renderDragHandle() {
        return (
            <div
                className="dragHandleWrapper"
                onMouseDown={(e) => this.onMouseDown(e)}
            />
        );
    }



    onArrowPress(e) {
        if (e.which > 36 && 41 > e.which) {
            this.props.onComponentHoldToggle(true);
        }
        switch (e.which) {
            case 37:
                if (e.shiftKey) {
                    this.props.onMove({ x: -10, y: 0});
                } else {
                    this.props.onMove({ x: -1, y: 0});
                }
                break;
            case 38:
                if (e.shiftKey) {
                    this.props.onMove({ x: 0, y: -10});
                } else {
                    this.props.onMove({ x: 0, y: -1});
                }
                break;
            case 39:
                if (e.shiftKey) {
                    this.props.onMove({ x: 10, y: 0});
                } else {
                    this.props.onMove({ x: 1, y: 0});
                }
                break;
            case 40:
                if (e.shiftKey) {
                    this.props.onMove({ x: 0, y: 10});
                } else {
                    this.props.onMove({ x: 0, y: 1});
                }
                break;
            default:
                return;
        }
    }

    render() {
        const self = this;

        const {
            isSelected,
            position,
            dimensions,
            // isHolding
        } = self.props;

        const { isDragging } = self.state;

        let wrapClass = "";

        if (isSelected) {
            wrapClass = "wrapperSelected";
        }

        if (isDragging) wrapClass += " wrapperDragging";

        return (
            <div
                style={{
                    display: !isSelected ? "none" : "block"
                }}
                onKeyDown={e => self.onArrowPress(e)}
                onClick={e => e.stopPropagation()}
                tabIndex="1"
            >
                <div
                    ref={wrapper => {
                        self.wrapper = wrapper;
                    }}
                    className={wrapClass}
                    style={{
                        ...this.props.style,
                        zIndex: 101,
                        position: "absolute",
                        left: position.x,
                        top: position.y,
                        width: dimensions.x,
                        height: dimensions.y,
                        pointerEvents: "none"
                    }}
                    onContextMenu={e => e.preventDefault()}
                >
                    {isSelected ? self.renderAnchors() : null}
                    {isSelected ? self.renderDragHandle() : null}
                </div>
            </div>
        );
    }
}