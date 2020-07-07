/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ListAccount from './ListAccount';
import CreateWallet from './CreateWallet';
import RestoreWallet from './RestoreWallet';
import AddFaucetAccount from './AddFaucetAccount';
import AccountsRefreshIcon from './AccountsRefreshIcon';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerLoading: false,
    };
    this.handleSpinnerloading = this.handleSpinnerloading.bind(this);
  }

  handleSpinnerloading() {
    const { spinnerLoading } = this.state;
    this.props.getBalanceAction(this.props);
    this.setState({ spinnerLoading: !spinnerLoading }, () => {
      setTimeout(() => {
        this.setState({ spinnerLoading });
      }, 1000);
    });
  }

  render() {
    const CurrentTab = this.props.selectedContractsTab;
    return (
      <div className="accounts-container">
        <nav style={{ padding: '5px' }}>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <span
              className={
                CurrentTab === 'listAccounts'
                  ? 'accounts-editor-siderbar-nav nav-link active'
                  : 'accounts-editor-siderbar-nav nav-link'
              }
              id="nav-michelson-tab"
              data-toggle="tab"
              role="tab"
              style={{ paddingBottom: '0px' }}
              onClick={() =>
                this.props.handleContractsTabChangeAction('listAccounts')
              }
            >
              List Accounts{' '}
              <AccountsRefreshIcon
                {...this.state}
                handleSpinnerloading={this.handleSpinnerloading}
              />
            </span>
            <span
              className={
                CurrentTab === 'createWallet'
                  ? 'accounts-editor-siderbar-nav nav-link active'
                  : 'accounts-editor-siderbar-nav nav-link'
              }
              id="nav-deploy-tab"
              data-toggle="tab"
              role="tab"
              style={{ paddingBottom: '0px' }}
              onClick={() =>
                this.props.handleContractsTabChangeAction('createWallet')
              }
            >
              Create Wallet
            </span>
            <span
              className={
                CurrentTab === 'restoreWallet'
                  ? 'accounts-editor-siderbar-nav nav-link active'
                  : 'accounts-editor-siderbar-nav nav-link'
              }
              id="nav-deploy-tab"
              data-toggle="tab"
              role="tab"
              style={{ paddingBottom: '0px' }}
              onClick={() =>
                this.props.handleContractsTabChangeAction('restoreWallet')
              }
            >
              Restore Wallet
            </span>
            <span
              className={
                CurrentTab === 'addFaucetAccount'
                  ? 'accounts-editor-siderbar-nav nav-link active'
                  : 'accounts-editor-siderbar-nav nav-link'
              }
              id="nav-deploy-tab"
              data-toggle="tab"
              role="tab"
              style={{ paddingBottom: '0px' }}
              onClick={() =>
                this.props.handleContractsTabChangeAction('addFaucetAccount')
              }
            >
              Add Faucet Account
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
              CurrentTab === 'listAccounts'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="nav-michelson"
            role="tabpanel"
            style={
              CurrentTab === 'listAccounts'
                ? { display: 'flex' }
                : { display: 'none' }
            }
            aria-labelledby="nav-michelson-tab"
          >
            <ListAccount {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'createWallet'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="nav-deploy"
            role="tabpanel"
            aria-labelledby="nav-deploy-tab"
          >
            <CreateWallet {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'restoreWallet'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="nav-deploy"
            role="tabpanel"
            aria-labelledby="nav-deploy-tab"
          >
            <RestoreWallet {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'addFaucetAccount'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="nav-deploy"
            role="tabpanel"
            aria-labelledby="nav-deploy-tab"
          >
            <AddFaucetAccount {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default index;
