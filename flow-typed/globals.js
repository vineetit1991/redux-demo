// declare type Dispatch = (action: { type: string, payload: Object }) => any

// declare type Store = {
//     dispatch: Dispatch,
//     subscribe: (listener: () => void) => (() => void),
//     getState: () => any,
//     replaceReducer: any
// };


type _ExtractReturn<B, F: (...args: any[]) => B> = B;

declare type ExtractReturn<F> = _ExtractReturn<*, F>;

// declare type Reducer<S, A, D> = (state: S, action: A, ?D) => S;
// declare function combineReducers<O, A>(reducers: O): Reducer<$ObjMap<O, ExtractState>, A>;
// declare type Reducer<S, A> = (state: S | void, action: A) => S;





declare module "Redux-Module" {
    declare export type Reducer = <S, A>(s: S, a: A) => S;
    declare export type PlainAction = {| type: string, payload?: any, meta?: any |};
    declare export type ReducerConfigurations = {|
        reducer: <S>(s: S, a: any, d?: Object) => S;
        getDependencies?: <R>(a: R) => Object
    |};
    declare export type CombineReducers = <R>(a: R) => Reducer;

    declare type ExtractState = <R>((s: R, A: any, D?: any) => R) => R;

    declare type ExtractFinalState<O: { reducer: Function }> = (obj: O) => O

    declare function initialState<O: {[key: string]: Function}>(o: O): $ObjMap<O, ExtractState>;

    declare type InitialState = typeof initialState;
}