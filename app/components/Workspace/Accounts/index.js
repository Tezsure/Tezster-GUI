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
      },
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleActivateAccount = this.handleActivateAccount.bind(this);
    this.handleValidateModalOpen = this.handleValidateModalOpen.bind(this);
    this.handleWalletModalShow = this.handleWalletModalShow.bind(this);
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
      publicKey: args.pk,
      publicKeyHash: args.pkh,
      secretKey: args.sk,
    };
    userState.currentAccount = currentAccount;
    this.setState({ ...userState }, () => {
      this.props.toggleAccountsModalAction('show-user-wallet');
    });
  }

  render() {
    return (
      <>
        <div className="accounts-container">
          <div className="cards-container">
            <div className="cards button-card accounts-button-container">
              <div className="button-accounts">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.handleModalToggle('restore-accounts')}
                >
                  Restore Wallet
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
          <React.Fragment />
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
