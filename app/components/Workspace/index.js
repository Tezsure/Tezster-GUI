import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import PropTypes from 'prop-types';

function Workspace(props) {
  return (
    <div
      className="grid-container"
      style={
        props.sidebarToggleState
          ? { gridTemplateColumns: '20% 80%' }
          : { gridTemplateColumns: '10% 90%' }
      }
    >
      <Header {...props} />
      <Sidebar {...props} />
      <Dashboard {...props} />
    </div>
  );
}

Sidebar.protoTypes = {
  sidebarToggleState: PropTypes.bool
};

export default Workspace;
