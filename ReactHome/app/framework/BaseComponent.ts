import * as React from 'react';
import * as Redux from 'redux';
import Dispatch = Redux.Dispatch;

export default class BaseComponent<TProps, TState, TDispatcher> extends React.Component<(TProps & TState & TDispatcher), {}> {
    constructor() {
        super();
    }

    private _getOwner(data) {
        if (!data) return null;

        var owner = data._currentElement._owner;
        if (!owner) return null;
        if (owner._instance.constructor.name !== "Connect") {
            return owner;
        }
        return this._getOwner(owner)
    }

    //in render function
    protected getComponentPath() {
        return this._getComponentPath(this["_reactInternalInstance"]);
    }

    private _getComponentPath(data) {
        var path = [];
        var component = data;
        while (component) {
            path.push(component._instance.constructor.name);
            component = this._getOwner(component);
        }
        var result = "";
        for (var i = 0; i < path.length; i++) {
            result = path[i] ? (path[i] + (result ? "." + result : "")): result;
        }
        return result;
    }
}