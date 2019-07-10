import React from 'react';
import { connect } from 'react-redux';
import {
    onComponentScale,
    onComponentMove,
    selectComponent,
    componentDataChange,
    correctComponentPosition
} from "../../../reducers/components/actions";

import {updateWorkSpaceDimension } from "../../../reducers/workspace/actions";
import ComponentWrapper from "./componentWrapper";
import TransformBox from "../../../components/transformationBox";
import components from "../../../static/components/utils";

import MCTAWrapper from "../mcta";
import PropertyPanel from "../propertyPanel";


import {sequenceActions} from "../../../redux-utility/sequence";

import "./index.css";



const getComponentsOnWorkspace = ({
    componentIds,
    componentsMap,
    selectedComponents,
    onComponentSelected,
    onComponentHoldToggle,
    onDoubleClick,
    onInteractionStart,
    onInteractionEnd,
    isTransformationDisabled,
    onComponentDataChange,
    holdingComponent
}) => {
    return componentIds.map(componentId => {
        const component = componentsMap[componentId];

        const componentDef = components.getDef(component.kind);

        const props = {
            componentDef,
            component,
            onComponentSelected,
            onComponentHoldToggle,
            onDoubleClick,
            onInteractionStart,
            onInteractionEnd,
            isTransformationDisabled,
            selectedComponents,
            onComponentDataChange,
            holdingComponent
        }

        return <ComponentWrapper {...props} key={component.id} />;
    });
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            holdingComponent: false,
            isTransformationDisabled: false
        }

        let a = this.setState.bind(this);

        this.setState = (args) => {
            console.log('%c Component Name: ' 
                + this._reactInternalFiber.elementType.name
                + "       set state called with payload ===> " + JSON.stringify(args) + "\n",
                'font-size: 10px; color: blue'
            );
            a(args);
        }
    }

    getSelectionView(isHoldingComponent) {
        if (this.props.selectedComponents.length < 1) return;
        return <TransformBox
            key="transform-box"
            isSelected={this.props.selectedComponents.length === 1}
            onMove={to => {
                this.props.dispatch(sequenceActions([
                    onComponentMove(to),
                    updateWorkSpaceDimension(),
                    correctComponentPosition()
                ]))
                // this.props.dispatch(onComponentMove(to))
            }}
            onScale={(a) => {
                this.props.dispatch(onComponentScale({ ...a }));
            }}
            // onScaleParent={({ x }) => {
            //     this.props.dispatch(scaleWorkspace(x));
            // }}
            onScaleStart={() => {
                this.setState({
                    isTransformationDisabled: false,
                    holdingComponent: true
                });
            }}
            dimensions={{
                x: this.props.componentsMap[this.props.selectedComponents[0]].props.width,
                y: this.props.componentsMap[this.props.selectedComponents[0]].props.height
            }}
            // parentDimension={{
            //     x: this.props.workspace.width,
            //     y: this.props.workspace.height
            // }}
            position={{
                x: this.props.componentsMap[this.props.selectedComponents[0]].props.left,
                y: this.props.componentsMap[this.props.selectedComponents[0]].props.top
            }}
            preserveAspectRatio={false} // can component pass this from defination.
            containerPosition={{
                x: this.props.workspace.left,
                y: this.props.workspace.top
            }}
            onComponentHoldToggle={(isHolding) => this.onComponentHoldToggle(isHolding)}
            isHolding={isHoldingComponent}
            minWidth={60}
            minHeight={40}
            maxLeft={this.props.workspace.width}
        />
    }
    

    onComponentHoldToggle(isHolding) {
        this.setState({
            holdingComponent: isHolding
        });
    }

    onInteractionStart() {
        this.setState({ isTransformationDisabled: true });
    }

    onInteractionEnd() {
        this.setState({ isTransformationDisabled: false });
    }

    renderMCTA() {
        if (this.state.holdingComponent) return;

        return <MCTAWrapper
            onComponentDataChange= {comp =>  this.props.dispatch(componentDataChange(comp))}
            interaction={{
                onInteractionStart: () => this.onInteractionStart(),
                onInteractionEnd: () => this.onInteractionEnd()
            }}
            selectedByDoubleClick={this.state.isTransformationDisabled}
        />;
    }

    isPPVisible() {
        return !this.state.holdingComponent && this.props.selectedComponents.length === 1 && this.state.isTransformationDisabled;
    }

    renderPP() {
        if (!this.state.holdingComponent && this.props.selectedComponents.length === 1 && this.state.isTransformationDisabled)
            return <PropertyPanel
                onComponentDataChange= {comp =>  this.props.dispatch(componentDataChange(comp))}
                interaction={{
                    onInteractionStart: () => this.onInteractionStart(),
                    onInteractionEnd: () => this.onInteractionEnd()
                }}
                selectedByDoubleClick={this.state.isTransformationDisabled}
            />
    }

    render() {
        const props = this.props;
        return <div className='page'>
        {this.renderMCTA()}
        {this.renderPP()}
        {
            getComponentsOnWorkspace({
                holdingComponent: this.state.holdingComponent,
                onComponentDataChange: comp =>  this.props.dispatch(componentDataChange(comp)),
                isTransformationDisabled: this.state.isTransformationDisabled,
                componentIds: props.componentIds,
                componentsMap: props.componentsMap,
                selectedComponents: props.selectedComponents,
                onInteractionStart: () => this.onInteractionStart(),
                onInteractionEnd: () => this.onInteractionEnd(),
                onComponentSelected: a => this.props.dispatch(selectComponent(a)),
                onComponentHoldToggle: (a) => this.onComponentHoldToggle(a),
                onDoubleClick: a => this.props.onDoubleClick(a)
            }).concat(this.getSelectionView(this.state.holdingComponent))
        }
        </div>
    }
}

function mapStateToProps(state) {
    const { components, workspace } = state;
    return {
        componentsMap: components.byIds,
        componentIds: components.ids,
        selectedComponents: components.selected,
        workspace
    };
}

export default connect(mapStateToProps)(Page);

