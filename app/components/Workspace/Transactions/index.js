/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TransactionModal from './TransactionModal';
import TransactionTable from './TransactionTable';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      accountId: '0',
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ accountId: event.target.value });
  }

  handleModalToggle() {
    this.props.toggleTransactionModalAction(!this.props.showTransactionModal);
  }

  render() {
    const Accounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {`${elem.label}-${elem.account}`}
      </option>
    ));
    const Transactions =
      this.state.accountId !== '0' &&
      this.props.userAccounts.length > 0 &&
      this.props.userTransactions.length > 0 ? (
        <TransactionTable {...this.props} />
      ) : (
        <div className="empty-transaction">No Transactions To Display</div>
      );
    return (
      <>
        <div className="transaction-container">
          <div className="cards-container">
            <div
              style={{ justifyContent: 'flex-start' }}
              className="cards button-card accounts-button-container"
            >
              <div style={{ marginLeft: '0px' }} className="button-accounts">
                <button
                  type="button"
                  onClick={this.handleModalToggle}
                  className="btn btn-success"
                >
                  Transfer Tezos
                </button>
              </div>
            </div>
          </div>
          {this.props.dashboardHeader.networkId !== 'Localnode' ? (
            <div className="transactions-contents">
              <div className="modal-input">
                <p>
                  Note: It may take upto 1 minute for the transactions to get
                  commited on network.
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="transactions-contents">
            <div className="modal-input">
              <div className="input-container" style={{ width: '35%' }}>
                Select Wallet{' '}
              </div>
              <select
                className="custom-select"
                name="accounts"
                onChange={this.handleInputChange}
                value={
                  this.props.userAccounts.length > 0
                    ? this.state.accountId
                    : '0'
                }
              >
                <option value="0" disabled>
                  Select account to display transactions
                </option>
                {Accounts}
              </select>
            </div>
          </div>
          <div className="cards-container">
            <div
              style={{ justifyContent: 'flex-start' }}
              className="cards button-card accounts-button-container"
            >
              <div className="button-accounts" style={{ marginLeft: '26%' }}>
                {this.props.buttonState ? (
                  <button className="btn btn-success" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    &nbsp;Please wait...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    disabled={
                      this.state.accountId === '0' || this.props.buttonState
                    }
                    onClick={() => {
                      this.props.selectTransactionWalletAction({
                        accountId: this.state.accountId,
                        ...this.props,
                      });
                    }}
                  >
                    Show transactions
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="transactions-contents">{Transactions}</div>
          {this.props.showTransactionModal ? (
            <TransactionModal
              {...this.props}
              {...this.state}
              handleModalToggle={this.handleModalToggle}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default Transactions;
