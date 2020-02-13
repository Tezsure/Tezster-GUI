import React, { Component } from 'react';

class CallContract extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleCallContract = this.handleCallContract.bind(this);
  }

  handleCallContract(event) {}

  render() {
    const Accounts = this.props.userAccounts.map(elem => (
      <option key={elem.contracts} value={elem.contracts}>
        {elem.contracts}
      </option>
    ));
    return (
      <div className="transactions-contents">
        <div className="modal-input">
          <div className="input-container">Select Wallet </div>
          <select className="custom-select" name="accounts">
            <option value="0" disabled>
              Select account to display transactions
            </option>
            {Accounts}
          </select>
        </div>
        <div className="modal-input">
          <div className="input-container">Contract label </div>
          <input
            type="text"
            name="label"
            className="form-control"
            placeholder="Contract Label"
          />
        </div>
        <div className="modal-input">
          <div className="input-container">Initial Value </div>
          <input
            type="text"
            name="label"
            className="form-control"
            placeholder="Initial value for account"
          />
        </div>
        <div className="cards-container">
          <div className="cards button-card accounts-button-container">
            <div className="button-accounts">
              <button type="button" className="btn btn-success">
                Call Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CallContract;
