import React, { Component } from 'react';
import TransactionModal from './TransactionModal';
import TransactionTable from './TransactionTable';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.props.selectWalletAction({
      accountId: event.target.value,
      ...this.props
    });
  }

  handleModalToggle() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const Accounts = this.props.userAccounts.map(elem => (
      <option key={elem.contracts} value={elem.contracts}>
        {elem.contracts}
      </option>
    ));
    const Transactions =
      this.props.userTransactions.length > 0 ? (
        <TransactionTable {...this.props} />
      ) : (
        <div>No Transactions To Display</div>
      );
    return (
      <>
        <div className="transaction-container">
          <div className="cards-container">
            <div className="cards button-card accounts-button-container">
              <div className="button-accounts">
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
          <div className="transactions-contents">
            <div className="modal-input">
              <div className="input-container">Select Wallet </div>
              <select
                className="custom-select"
                name="accounts"
                onChange={this.handleInputChange}
                value={this.props.selectedTransactionWallet}
              >
                <option value="0" disabled>
                  Select account to display transactions
                </option>
                {Accounts}
              </select>
            </div>
          </div>
          <div className="transactions-contents">{Transactions}</div>
          {this.state.showModal ? (
            <TransactionModal
              {...this.props}
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
