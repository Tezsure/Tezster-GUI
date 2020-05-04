/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Table from './Table';
import AccountsModal from './AccountsModal';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      currentAccount: {
        publicKey: '',
        publicKeyHash: '',
        secretKey: '',
        spinnerLoading: false,
      },
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleActivateAccount = this.handleActivateAccount.bind(this);
    this.handleValidateModalOpen = this.handleValidateModalOpen.bind(this);
    this.handleWalletModalShow = this.handleWalletModalShow.bind(this);
    this.handleSpinnerloading = this.handleSpinnerloading.bind(this);
  }

  handleModalToggle(modalType) {
    this.props.toggleAccountsModalAction(modalType);
  }

  handleValidateModalOpen(modalType) {
    this.props.toggleAccountsModalAction(modalType);
  }

  handleActivateAccount({ ...args }) {
    this.props.createFaucetAccountsAction({ ...args });
  }

  handleWalletModalShow({ ...args }) {
    const userState = { ...this.state };
    const currentAccount = {
      label: args.label,
      amount: args.balance,
      publicKey: args.pk,
      secretKey: args.sk,
      publicKeyHash: args.pkh,
    };
    userState.currentAccount = currentAccount;
    this.setState({ ...userState }, () => {
      this.props.toggleAccountsModalAction('show-user-wallet');
    });
  }

  handleSpinnerloading() {
    const { spinnerLoading } = this.state;
    this.props.getBalanceAction({ ...this.props });
    this.setState({ spinnerLoading: !spinnerLoading }, () => {
      setTimeout(() => {
        this.setState({ spinnerLoading });
      }, 1000);
    });
  }

  render() {
    const { spinnerLoading } = this.state;
    return (
      <>
        <div className="accounts-container">
          <div className="cards-container">
            <div className="cards button-card accounts-button-container">
              <div className="button-accounts">
                <svg
                  className={
                    spinnerLoading
                      ? 'bi bi-arrow-repeat refresh-icon'
                      : 'bi bi-arrow-repeat'
                  }
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  style={{ cursor: 'pointer' }}
                  onClick={this.handleSpinnerloading}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z"
                    clipRule="evenodd"
                  />
                  <title>Click to refresh balance</title>
                </svg>
              </div>
              <div className="button-accounts">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.handleModalToggle('restore-accounts')}
                >
                  Restore/Create Wallet
                </button>
              </div>
              <div className="button-accounts">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.handleModalToggle('activate-accounts')}
                >
                  Add Faucet Account
                </button>
              </div>
            </div>
          </div>
          <Table
            {...this.props}
            handleWalletModalShow={this.handleWalletModalShow}
          />
        </div>
        {this.props.showAccountsModal === '' ? (
          <></>
        ) : (
          <AccountsModal
            {...this.props}
            {...this.state}
            modalType={this.state.modalType}
            handleModalToggle={this.handleModalToggle}
            handleActivateAccount={this.handleActivateAccount}
            handleValidateModalOpen={this.handleValidateModalOpen}
          />
        )}
      </>
    );
  }
}

export default Accounts;
