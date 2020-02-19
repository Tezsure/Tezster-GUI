import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

class Workspace extends Component {
  componentDidMount() {
    this.props.getAccountsAction({ ...this.props });
    this.props.getDashboardHeaderAction({ ...this.props });
  }

  render() {
    return (
      <div
        className="grid-container"
        style={
          this.props.sidebarToggleState
            ? { gridTemplateColumns: '20% 80%' }
            : { gridTemplateColumns: '10% 90%' }
        }
      >
        <Header {...this.props} />
        <Sidebar {...this.props} />
        <Dashboard {...this.props} />
      </div>
    );
  }
}
Sidebar.protoTypes = {
  sidebarToggleState: PropTypes.bool,
  getDashboardHeaderAction: PropTypes.func,
  getAccountsAction: PropTypes.func
};

export default Workspace;
