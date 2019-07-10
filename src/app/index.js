import React from 'react';
import Workspace from "./childrens/workspace";
import TopBar from "./childrens/topBar";
import LeftPanel from "./childrens/leftPanel";
import ShortcutIcon from "./childrens/shortcutIcon";

import { connect } from 'react-redux';

import {asyncActions } from "../redux-utility/sequence";
import {showLoading } from "../reducers/workspace/actions";

import {loadData } from "../reducers/components/middleware";

import './index.css';

class App extends React.Component {
    componentWillMount() {
        this.props.dispatch(asyncActions([
            showLoading(),
            loadData()
        ]));
        // this.props.dispatch(loadData())
    }

    render() {
        if (this.props.loading) {
            return <div> Loading Data</div>;
        }

        return (
            <div className="app">
                <TopBar />
                <ShortcutIcon />
                <div className="bodyContainer">
                    <LeftPanel />
                    <Workspace />
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        loading: state.workspace.loading
    };
})(App);
