import './App.less';
import React, { PropTypes } from 'react';
import { RouteHandler, Link } from 'react-router';
import invariant from 'react/lib/invariant';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import Navbar from '../Navbar';
import NotFoundPage from '../NotFoundPage';
import setViewport from './setViewport';

class App {

  static propTypes = {
    path: PropTypes.string.isRequired,
    viewport: PropTypes.object.isRequired,
    setTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
  	this.props.setTitle("test");


    return (
      <div className="App">
        <Navbar />
        <RouteHandler />
      </div>
  	);
  }	
}

export default setViewport(App);
