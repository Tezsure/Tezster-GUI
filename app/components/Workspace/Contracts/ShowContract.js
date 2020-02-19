import React, { Component } from 'react';

class ShowContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
        <div className="cards-container">
          <div className="cards button-card accounts-button-container">
            <div className="button-accounts">
              <button
                type="button"
                className="btn btn-success"
                onClick={() =>
                  this.props.showContractHistoryAction({
                    ...this.props,
                    ...this.state
                  })
                }
              >
                Show Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowContract;
