import React, { Component } from 'react';

class TransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderAccount: '0',
      senderAccountErr: '',
      recieverAccount: '0',
      recieverAccountErr: '',
      amount: '',
      amountErr: '',
      gasPrice: '',
      gasPriceErr: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExecuteTransaction = this.handleExecuteTransaction.bind(this);
  }

  handleExecuteTransaction() {
    let errorFlag = false;
    const stateParams = {
      ...this.state,
      senderAccountErr: '',
      recieverAccountErr: '',
      amountErr: '',
      gasPriceErr: ''
    };
    if (stateParams.senderAccount === '0') {
      stateParams.senderAccountErr = 'Please select senders account';
      errorFlag = true;
    }
    if (stateParams.recieverAccount === '0') {
      stateParams.recieverAccountErr = 'Please select recievers account';
      errorFlag = true;
    }
    if (stateParams.amount === '') {
      stateParams.amountErr = 'Please enter amount';
      errorFlag = true;
    }
    if (stateParams.gasPrice === '') {
      stateParams.gasPriceErr = 'Please enter gas price';
      errorFlag = true;
    }

    if (!errorFlag) {
      this.props.executeTransactionAction({
        ...this.props,
        ...this.state
      });
    } else {
      this.setState(stateParams);
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const sendersAccounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {elem.account}
      </option>
    ));
    const recieverAccounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {elem.account}
      </option>
    ));
    return (
      <div
        className="modal fade show"
        role="dialog"
        style={{
          display: 'block',
          paddingRight: '15px',
          opacity: 1
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Transfer/Send Tezos</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.props.handleModalToggle()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-input">
              <div className="input-container">From </div>
              <select
                className="custom-select"
                name="senderAccount"
                value={this.state.senderAccount}
                onChange={this.handleInputChange}
              >
                <option value="0" disabled>
                  Select Sender&rsquo;s Account
                </option>
                {sendersAccounts}
              </select>
            </div>
            <span className="error-msg">{this.state.senderAccountErr}</span>
            <div className="modal-input">
              <div className="input-container">To </div>
              <select
                className="custom-select"
                name="recieverAccount"
                value={this.state.recieverAccount}
                onChange={this.handleInputChange}
              >
                <option value="0" disabled>
                  Select Sender&rsquo;s Account
                </option>
                {recieverAccounts}
              </select>
            </div>
            <span className="error-msg">{this.state.recieverAccountErr}</span>
            <div className="modal-input">
              <div className="input-container">Amount </div>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Enter your amount"
                value={this.state.amount}
                onChange={this.handleInputChange}
              />
            </div>
            <span className="error-msg">{this.state.amountErr}</span>
            <div className="modal-input">
              <div className="input-container">Gas Price </div>
              <input
                type="number"
                name="gasPrice"
                className="form-control"
                placeholder="Enter your gas price"
                value={this.state.gasPrice}
                onChange={this.handleInputChange}
              />
            </div>
            <span className="error-msg">{this.state.gasPriceErr}</span>
            <br />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => this.props.handleModalToggle()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.handleExecuteTransaction()}
              >
                Pay Amount
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionModal;
