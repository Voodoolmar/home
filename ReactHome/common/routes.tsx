import * as React from 'react'
import { Router, Route, browserHistory, useRouterHistory} from 'react-router'
import App from '../app/components/App'
import Active from '../app/components/Active'


const routers = [
    <Route key={'app'} path="/" component={App}>
        <Route path="/" component={Active} />
    </Route>
];
export default routers; 