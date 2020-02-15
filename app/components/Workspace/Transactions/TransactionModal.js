import React, { Component } from 'react';

class TransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderAccount: '0',
      recieverAccount: '0',
      amount: '',
      gasPrice: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const sendersAccounts = this.props.userAccounts.map(elem => (
      <option value={elem.account}>{elem.account}</option>
    ));
    const recieverAccounts = this.props.userAccounts.map(elem => (
      <option value={elem.account}>{elem.account}</option>
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
                <option value="0" selected disabled>
                  Select Sender&rsquo;s Account
                </option>
                {sendersAccounts}
              </select>
            </div>
            <div className="modal-input">
              <div className="input-container">To </div>
              <select
                className="custom-select"
                name="recieverAccount"
                value={this.state.recieverAccount}
                onChange={this.handleInputChange}
              >
                <option value="0" selected disabled>
                  Select Sender&rsquo;s Account
                </option>
                {recieverAccounts}
              </select>
            </div>
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
                onClick={() =>
                  this.props.executeTransactionAction({
                    ...this.props,
                    ...this.state
                  })
                }
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
