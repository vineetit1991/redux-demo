// // @flow

// import Registery from "./registery";
// import { unSavedChanges } from "../reducers/savePublish/actions";
// import type { AppState, PlainAction } from "../store/types";


// export default (() => {
//     const reducers = [...Registery];

//     const combine = (state: AppState, action: PlainAction): AppState => {
//         let nextState: AppState = { ...state };
//         reducers.forEach(reducerObj => {
//             nextState[reducerObj.name] = reducerObj.reducer(
//                 state[reducerObj.name],
//                 action,
//                 reducerObj.helperFn && reducerObj.helperFn(state)
//             );

//             if (nextState[reducerObj.name] !== state[reducerObj.name]) {
//                 console.log(
//                     action.type, " ------------- Action changed -------------->  ", reducerObj.name
//                 );
//                 console.dirxml("             ", action.payload);
//             }
//         });
//         // console.groupEnd();
//         // if (action.doSave)  {
//         //     return combine(nextState, unSavedChanges);
//         // }
//         return nextState;
//     };

//     return combine;
// })();