/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import AddRpc from './add-rpc';
import RemoveRpc from './remove-rpc';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const CurrentTab = this.props.selectedContractsTab;
    return (
      <div className="accounts-container">
        <nav style={{ padding: '5px' }}>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <span
              className={
                CurrentTab === 'AddRpc'
                  ? 'accounts-editor-siderbar-nav nav-link active'
                  : 'accounts-editor-siderbar-nav nav-link'
              }
              id="nav-michelson-tab"
              data-toggle="tab"
              role="tab"
              style={{ paddingBottom: '0px' }}
              onClick={() =>
                this.props.handleContractsTabChangeAction('AddRpc')
              }
            >
              Add rpc{' '}
            </span>
            <span
              className={
                CurrentTab === 'RemoveRpc'
                  ? 'accounts-editor-siderbar-nav nav-link active'
                  : 'accounts-editor-siderbar-nav nav-link'
              }
              id="nav-deploy-tab"
              data-toggle="tab"
              role="tab"
              style={{ paddingBottom: '0px' }}
              onClick={() =>
                this.props.handleContractsTabChangeAction('RemoveRpc')
              }
            >
              Remove rpc
            </span>
          </div>
        </nav>
        <div
          className="tab-content"
          id="nav-tabContent"
          style={{ width: '100%', height: '100%' }}
        >
          <div
            className={
              CurrentTab === 'AddRpc'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="nav-michelson"
            role="tabpanel"
            style={
              CurrentTab === 'AddRpc'
                ? { display: 'flex' }
                : { display: 'none' }
            }
            aria-labelledby="nav-michelson-tab"
          >
            <AddRpc {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'RemoveRpc'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="nav-michelson"
            role="tabpanel"
            style={
              CurrentTab === 'RemoveRpc'
                ? { display: 'flex' }
                : { display: 'none' }
            }
            aria-labelledby="nav-michelson-tab"
          >
            <RemoveRpc {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default index;
