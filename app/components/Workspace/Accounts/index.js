import React, { Component } from 'react';
import Table from './Table';
import AccountsModal from './AccountsModal';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: ''
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleActivateAccount = this.handleActivateAccount.bind(this);
    this.handleValidateModalOpen = this.handleValidateModalOpen.bind(this);
  }

  handleModalToggle(modalType) {
    this.props.toggleAccountsModalAction(modalType);
  }

  handleValidateModalOpen(modalType) {
    this.props.toggleAccountsModalAction(modalType);
  }

  handleActivateAccount({ ...args }) {
    this.props.createAccountsAction({ ...args });
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
                  Restore Account
                </button>
              </div>
              <div className="button-accounts">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.handleModalToggle('activate-accounts')}
                >
                  Activate Account
                </button>
              </div>
            </div>
          </div>
        </div>
        <Table {...this.props} />
        {this.props.showAccountsModal === '' ? (
          <React.Fragment />
        ) : (
          <AccountsModal
            {...this.props}
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
