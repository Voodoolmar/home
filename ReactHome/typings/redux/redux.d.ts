// Type definitions for Redux v1.0.0
// Project: https://github.com/rackt/redux
// Definitions by: William Buchwalter <https://github.com/wbuchwalter/>, Vincent Prouillet <https://github.com/Keats/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Redux {

    interface ActionCreator extends Function {
        (...args: any[]): any;
    }

    interface Reducer<TState> extends Function {
        (state: TState, action: any): TState;
    }

    interface Dispatch extends Function {
        (action: any): any;
    }

    interface StoreMethods {
        dispatch: Dispatch;
        getState(): any;
    }


    interface MiddlewareArg {
        dispatch: Dispatch;
        getState: Function;
    }

    interface Middleware extends Function {
        (obj: MiddlewareArg): Function;
    }

    class Store<TState> {
        getReducer(): Reducer<TState>;
        replaceReducer(nextReducer: Reducer<TState>): void;
        dispatch(action: any): any;
        getState(): TState;
        subscribe(listener: Function): Function;
    }

    function createStore<TState>(reducer: Reducer<TState>, initialState?: any, enhancer?: () => any): Store<TState>;
    function bindActionCreators<T>(actionCreators: T, dispatch: Dispatch): T;
    function combineReducers<TState>(reducers: any): Reducer<TState>;
    function applyMiddleware(...middlewares: Middleware[]): Function;
    function compose<T extends Function>(...functions: Function[]): T;
}

declare module "redux" {
    export = Redux;
}
