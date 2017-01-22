
import * as React from 'react';
import BaseComponent from '../framework/BaseComponent';
import {Link, History} from 'react-router';

export interface IMenuItemProps {
    children?: any;
    to?: string;
    query?: string;
    history?: any;
}
export interface IMenuItemState { }

export default class MenuItem extends BaseComponent<IMenuItemProps, IMenuItemState, {}> {
    render() {
        var owner = this.getComponentPath();

        const isActive = false;
        var className = isActive ? "active" : "";
        return (
            <li className={className}>
                <Link to={ this.props.to }>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}