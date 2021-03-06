/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
// import Accounts from '../Accounts';
import Accounts from '../Accounts';
import Blocks from '../Blocks';
import Transactions from '../Transactions';
import Contracts from '../Contracts';
import Events from '../Events';
import Logs from '../Logs';
import Help from '../Help';
import Settings from '../Settings';
import Editor from '../Editor';

import Header from './Header';

function Dashboard(props) {
  let DashboardContent = <Accounts {...props} />;
  if (props.currentTab === 'accounts') {
    DashboardContent = <Accounts {...props} />;
  } else if (props.currentTab === 'blocks') {
    DashboardContent = <Blocks {...props} />;
  } else if (props.currentTab === 'transactions') {
    DashboardContent = <Transactions {...props} />;
  } else if (props.currentTab === 'contracts') {
    DashboardContent = <Contracts {...props} />;
  } else if (props.currentTab === 'events') {
    DashboardContent = <Events {...props} />;
  } else if (props.currentTab === 'logs') {
    DashboardContent = <Logs {...props} />;
  } else if (props.currentTab === 'help') {
    DashboardContent = <Help {...props} />;
  } else if (props.currentTab === 'settings') {
    DashboardContent = <Settings {...props} />;
  } else if (props.currentTab === 'editor') {
    DashboardContent = <Editor {...props} />;
  }
  return (
    <main className="container-dashboard">
      <div className="inline-container">
        <Header {...props} />
        {DashboardContent}
      </div>
    </main>
  );
}

export default Dashboard;
