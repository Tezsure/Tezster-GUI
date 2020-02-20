import React, { Component } from 'react';

class DeployContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0',
      contractFile: '',
      contractLabel: '',
      initialValue: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    if (event.target.name === 'contractFile') {
      this.setState({ [event.target.name]: event.target.files });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    const Accounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {elem.account}
      </option>
    ));
    return (
      <div className="transactions-contents">
        <div className="modal-input">
          <div className="input-container">Select Wallet </div>
          <select
            className="custom-select"
            name="accounts"
            value={this.state.accounts}
            onChange={this.handleInputChange}
          >
            <option value="0" disabled>
              Select account to display transactions
            </option>
            {Accounts}
          </select>
        </div>
        <div className="modal-input">
          <div className="input-container">Upload Contract </div>
          <div className="custom-file">
            <input
              type="file"
              placeholder="Select smart contract"
              name="contractFile"
              accept=".tz"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="modal-input">
          <div className="input-container">Contract label </div>
          <input
            type="text"
            name="contractLabel"
            className="form-control"
            placeholder="Contract Label"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="modal-input">
          <div className="input-container">Initial Value </div>
          <input
            type="number"
            name="initialValue"
            className="form-control"
            placeholder="Initial value for account"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="cards-container">
          <div className="cards button-card accounts-button-container">
            <div className="button-accounts">
              <button
                type="button"
                className="btn btn-success"
                onClick={() =>
                  this.props.deployContractAction({
                    ...this.props,
                    ...this.state
                  })
                }
              >
                Deploy Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeployContract;
