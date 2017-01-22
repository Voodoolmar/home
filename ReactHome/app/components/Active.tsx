/// <reference path="../../typings/tsd.d.ts" />
import * as React from 'react';
import BaseComponent from '../framework/BaseComponent';
import { connect } from 'react-redux';
import RootState from '../model/RootState';

interface IPlanProps { 
   
}
interface IPlanDispatcher {
    
}
interface IPlanState {
    
}

class Active extends BaseComponent<{}, IPlanState, IPlanDispatcher> {
    render() {
        return (
            <div >
                erer
          </div>
        );
    }
}

export default connect<{}, RootState, IPlanProps, IPlanDispatcher>(
    
)(Active);