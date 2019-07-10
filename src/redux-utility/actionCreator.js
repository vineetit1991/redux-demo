// @flow

// export type Action<P> = {
//     type: string;
//     payload?: P,
//     doSave?: boolean,
//     sequence?: boolean,
//     aync?: boolean
// }

// type ActionCreatorResponse<P> = (payload: P) => Action<P>;

// export const actionCreator = <P>(type: string) : ActionCreatorResponse<P> =>  {
//     return (payload: P) => ({ type, payload});
// };

// export const actionCreatorWithSave = <P>(type: string) : ActionCreatorResponse<P> =>  {
//     return (payload: P) => ({ type, payload, doSave: true });
// };


// export const actionCreatorWithSave = <P>(type: string) : ActionCreatorResponse<P> =>  {
//     return Object.assign(
//         (payload) => ({ type, payload}),
//         { type, doSave: true }
//     )
// };


// export const isType = <P>(action: Action<any>, actionCreator: ActionCreatorResponse<P>) =>  {
//     return action.type === actionCreator.type;
// }





// window.actionCreator = actionCreator;