// import R from 'ramda';

// export default (dispatch: Dispatch) => {
//     let mouseMouseAfRequestAction;
//     const
//         onMouseMove = ({ clientX: x, clientY: y }): void => {
//             // mouseMouseAfRequestAction = {
//             //     type: OldAppActionTypes.WINDOW_MOUSE_MOVE,
//             //     payload: { x, y }
//             // };
//         },
//         subscriptions = {
//             mousemove: onMouseMove,
//             mouseup: ({ clientX: x, clientY: y, shiftKey, metaKey, ctrlKey, altKey }): void => {
//                 // dispatch(appActionCreators.mouseUpAC({ x, y }, shiftKey, metaKey, ctrlKey, altKey));
//             },
//             contextmenu: e => {
//                 // return e.preventDefault();
//             }
//         };

//     R.forEachObjIndexed((callback, eventName) => {
//         if (window.addEventListener) {
//             const useCapture = false;
//             window.addEventListener(eventName, callback, useCapture);
//         } else {
//             window['on' + eventName] = callback;
//         }
//     }, subscriptions);
// };
