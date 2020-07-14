/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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
        className={
          this.props.sidebarToggleState
            ? 'grid-container'
            : 'grid-container-collapsed'
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
  getAccountsAction: PropTypes.func,
};

export default Workspace;
