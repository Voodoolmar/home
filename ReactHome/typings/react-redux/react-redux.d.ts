// Type definitions for react-redux 4.4.0
// Project: https://github.com/rackt/react-redux
// Definitions by: Qubo <https://github.com/tkqubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../react/react.d.ts" />
/// <reference path="../redux/redux.d.ts" />

declare module "react-redux" {
	import { ComponentClass, Component, StatelessComponent } from 'react';
	import { Store, Dispatch, ActionCreator } from 'redux';

	export interface ComponentConstructDecorator<P> {
		<TComponentConstruct extends (ComponentClass<P> | StatelessComponent<P>)>(component: TComponentConstruct): ComponentClass<P>
	}

	/**
	 * Connects a React component to a Redux store.
	 * @param mapStateToProps
	 * @param mapDispatchToProps
	 * @param mergeProps
	 * @param options
	   */
	export function connect<P, TRootState, TState, TDispatch>(mapStateToProps?: MapStateToProps<TRootState, P, TState>,
		mapDispatchToProps?: MapDispatchToPropsFunction<P, TDispatch> | MapThunkDispatchToPropsFunction<P, TRootState, TDispatch> | MapDispatchToPropsObject,
		mergeProps?: MergeProps,
		options?: Options): ComponentConstructDecorator<P>;

	interface MapStateToProps<TRootState, P, TState> {
		(state: TRootState, ownProps?: P): TState;
	}

	interface MapDispatchToPropsFunction<P, TDispatch> {
		(dispatch: Dispatch, ownProps?: P): TDispatch;
	}
	

	interface MapThunkDispatchToPropsFunction<P, TRootState, TDispatch> {
		(dispatch: ThunkDispatch<TRootState>, ownProps?: P): TDispatch;
	}
	
    export interface ThunkDispatch<TRootState> extends Function {
        (factory: (dispatch: Dispatch, getState: () => TRootState) => any): any;
    }

	interface MapDispatchToPropsObject {
		[name: string]: ActionCreator;
	}

	interface MergeProps {
		(stateProps: any, dispatchProps: any, ownProps: any): any;
	}

	interface Options {
		/**
		 * If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps,
		 * preventing unnecessary updates, assuming that the component is a “pure” component
		 * and does not rely on any input or state other than its props and the selected Redux store’s state.
		 * Defaults to true.
		 * @default true
		 */
		pure: boolean;
	}

	export interface Property<TRootState> {
		/**
		 * The single Redux store in your application.
		 */
		store?: Store<TRootState>;
		children?: Function;
	}

	/**
	 * Makes the Redux store available to the connect() calls in the component hierarchy below.
	 */
	export class Provider extends Component<Property<any>, {}> { }
}
