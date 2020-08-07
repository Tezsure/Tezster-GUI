/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import DeployContract from './DeployContract';
import StorageContract from './StorageContract';
import InvokeContract from './InvokeContract';
import ListContract from './ListContract';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const CurrentTab = this.props.selectedContractsTab;
    return (
      <div className="contracts-table-container">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <span
              className={
                CurrentTab === 'deployContract' ? 'nav-link active' : 'nav-link'
              }
              id="home-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction('deployContract')
              }
            >
              Deploy contract
            </span>
          </li>
          <li className="nav-item">
            <span
              className={
                CurrentTab === 'invokeContract' ? 'nav-link active' : 'nav-link'
              }
              id="home-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction('invokeContract')
              }
            >
              Invoke contract
            </span>
          </li>
          <li className="nav-item">
            <span
              className={
                CurrentTab === 'storageContract'
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="home-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction('storageContract')
              }
            >
              View Contract Storage
            </span>
          </li>
          <li className="nav-item">
            <span
              className={
                CurrentTab === 'listContract' ? 'nav-link active' : 'nav-link'
              }
              id="home-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction('listContract')
              }
            >
              List/Add contract
            </span>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className={
              CurrentTab === 'deployContract'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <DeployContract {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'invokeContract'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <InvokeContract {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'storageContract'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <StorageContract {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'listContract'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <ListContract {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default index;
