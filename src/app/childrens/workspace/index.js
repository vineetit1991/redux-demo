import React from 'react';
import { connect } from 'react-redux';
import {
    setPosition,
    onScroll
} from "../../../reducers/workspace/actions";

import {sequenceActions } from "../../../redux-utility/sequence";
import { updatePosition } from "../../../reducers/mcta/actions";
import { resetSelectedElements } from "../../../reducers/components/actions";

import Page from "../page";

import "./index.css";


class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.pageRef = React.createRef();
    }

    componentDidMount() {
        if (!(this.myRef && this.myRef.current)) return;
        const node = this.myRef.current.querySelector(".workspace");
        if (node) {
            const {top, left } = node.getBoundingClientRect();
            this.props.dispatch(setPosition({
                top: top,
                left: left
            }));
        };
    }

	render() {
        return (
            <div
                className="workspaceParent"
                ref={this.myRef}
                onScroll={(e) => {
                    this.props.dispatch(
                        sequenceActions([
                            onScroll(e.target.scrollTop),
                            updatePosition(!e.target.querySelector(".propertiesPanelTop"))
                        ])
                    );
                }}
                 onClick={e => {
                    this.props.dispatch(resetSelectedElements());
                }}
            >
                <div
                    className='workspace'
                    style={{
                        width: this.props.workspace.width,
                        height: this.props.workspace.height
                    }}
                >
                    <Page ref={this.pageRef}/>
                    <div className="leftBar"/>
                    <div className="rightBar"/>
                </div>
            </div>
        );
	}
}

const mapStateToProps = (state) => {
  return { workspace: state.workspace };
}

export default connect(mapStateToProps)(Workspace);
