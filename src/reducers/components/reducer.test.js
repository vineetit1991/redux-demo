import ReducerConfig from './reducer';
import {
    resetSelectedElements
} from "./actions";
const rootState = JSON.parse('{"workspace":{"width":1000,"height":984,"top":45,"left":519.4375,"scrollTop":0,"loading":false},"savePublish":{"saveRequired":true,"saving":false},"components":{"byIds":{"0.24043117193442942":{"id":"0.24043117193442942","kind":"TEXT","label":"Text","name":"this is some dummy text","props":{"top":264,"left":319.5625,"width":100,"height":42,"minHeight":42},"behaviour":{"size":18}},"0.7031532447753657":{"id":"0.7031532447753657","kind":"BUTTON","label":"button","name":"button","props":{"top":166,"left":139.5625,"width":100,"height":40},"behaviour":{}}},"ids":["0.7031532447753657","0.24043117193442942"],"selected":["0.24043117193442942"]},"componentsPanel":{"activeComponent":null,"dragging":false},"mcta":{"width":280.234375,"height":40,"top":204,"left":319.5625},"propertyPanel":{"width":300,"height":300,"top":584,"left":985.5625}}');
const reducer = "Components";

const fn = (actionStateObj) => {
    it(`testing ${reducer} reducer with action = ${actionStateObj.action.type}`, () => { 
        const newState = ReducerConfig.reducer(actionStateObj.currentState, actionStateObj.action, ReducerConfig.getDependencies(rootState));
        expect(newState).toEqual(actionStateObj.expectedState);
    })
};

const reducerStates = [
    {
        action: { type: "*" },
        currentState: {
            byIds: {},
            ids: [],
            selected: []
        },
        expectedState: {
            byIds: {},
            ids: [],
            selected: []
        }
    },
    {
        action: resetSelectedElements(),
        currentState: {
            byIds: {},
            ids: [],
            selected: ["asdasdsd"]
        },
        expectedState: {
            byIds: {},
            ids: [],
            selected: []
        }
    }
];


reducerStates.map(fn);
  
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });