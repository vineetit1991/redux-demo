// @flow

import React from 'react';
import { connect } from 'react-redux';

import {
    saving
} from "../../../reducers/savePublish/actions";

import {
    onSave
} from "../../../reducers/savePublish/middleware";

import {asyncActions} from "../../../redux-utility/sequence";

import "./index.css";

const TopBar = ({ dispatch, savingData, saveRequired }) => {
    return <div className='topBar'>
        <div  className={ !saveRequired ? 'disabled save' : 'save'} onClick={_ => {
            dispatch(asyncActions([
                saving(),
                onSave()
            ]));
        }}>{savingData && !saveRequired ? 'Saving' : "Save"}</div>
    </div>;
}

function mapStateToProps(state) {
    const { savePublish } = state;
    return {
        savingData: savePublish.saving,
        saveRequired: savePublish.saveRequired
    };
}


export default connect(mapStateToProps)(TopBar);