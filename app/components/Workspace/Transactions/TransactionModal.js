/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class TransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderAccount: '0',
      senderAccountErr: '',
      recieverAccount: '',
      recieverAccountErr: '',
      amount: '',
      suggestions: [],
      amountErr: '',
      gasPrice: '2000',
      gasPriceErr: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExecuteTransaction = this.handleExecuteTransaction.bind(this);
    this.handleAutosuggestOnChange = this.handleAutosuggestOnChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
  }

  componentDidMount() {
    this.setState({ gasPrice: '2000' });
  }

  handleAutosuggestOnChange(event) {
    this.setState({
      recieverAccount: event.target.value
        ? event.target.value
        : event.target.innerText,
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value, reason }) {
    const { userAccounts } = this.props;
    const { recieverAccount } = this.state;

    const inputValue = value;
    const inputLength = inputValue.length;

    let suggestions = [];
    if (inputLength !== 0) {
      // eslint-disable-next-line array-callback-return
      suggestions = userAccounts.filter((elem) => {
        const currentAccount = `${elem.label}-${elem.account}`;
        if (currentAccount.includes(inputValue)) {
          return elem.account;
        }
      });
    }
    if (reason === 'input-focused' && recieverAccount === '') {
      suggestions = userAccounts;
    }
    if (reason === 'input-changed' && inputLength === 0) {
      suggestions = userAccounts;
    }
    if (reason === 'suggestion-selected') {
      suggestions = [];
    }
    this.setState({
      suggestions,
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  handleExecuteTransaction() {
    let errorFlag = false;
    const stateParams = {
      ...this.state,
      senderAccountErr: '',
      recieverAccountErr: '',
      amountErr: '',
      gasPriceErr: '',
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
    if (
      stateParams.senderAccount !== '0' &&
      stateParams.amount !== '' &&
      parseInt(stateParams.senderAccount, 10) <
      parseInt(stateParams.amount, 10) * 1000000
    ) {
      stateParams.amountErr = `Transaction amount should be less than the sender's account balance`;
      errorFlag = true;
    }

    if (!errorFlag) {
      const recieverAccountAddressLocation =
        this.state.recieverAccount.split('-').length - 1;
      const recieverAccount =
        recieverAccountAddressLocation > 0
          ? this.state.recieverAccount.split('-')[
          recieverAccountAddressLocation
          ]
          : this.state.recieverAccount.split('-')[0];
      this.props.executeTransactionAction({
        ...this.props,
        ...this.state,
        recieverAccount,
      });
    } else {
      this.setState(stateParams);
    }
  }

  handleInputChange(event) {
    const argsName = event.target.name;
    if (event.target.name === 'amount' && event.target.type === 'number') {
      if (event.target.value >= 0) {
        this.setState({ [event.target.name]: event.target.value });
      }
    } else {
      this.setState(
        {
          [argsName]: event.target.value,
        },
        () => {
          if (argsName === 'senderAccount') {
            this.props.getAccountBalanceAction({
              ...this.props,
              pkh: this.state.senderAccount,
            });
          }
        }
      );
    }
  }

  render() {
    const gasPrice =
      this.state.gasPrice === 'undefined' ? '2000' : this.state.gasPrice;
    const { recieverAccount, suggestions } = this.state;
    const sendersAccounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {`${elem.label}-${elem.account}`}
      </option>
    ));

    const getSuggestionValue = (suggestion) => {
      return suggestion.account;
    };

    // function to render suggestions.
    const renderSuggestion = (suggestion) => {
      return (
        <div
          value={suggestion.account}
        >{`${suggestion.label}-${suggestion.account}`}</div>
      );
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Enter reciever's account",
      value: recieverAccount,
      onChange: this.handleAutosuggestOnChange,
    };
    return (
      <div
        className="modal fade show"
        role="dialog"
        style={{
          display: 'block',
          paddingRight: '15px',
          opacity: 1,
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ width: '600px' }}>
            <div className="modal-header">
              <h5 className="modal-title">Transfer/Send Tez</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.props.handleModalToggle();
                  this.props.toggleButtonState();
                }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-input">
              <div className="input-container">From* </div>
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
            {this.state.senderAccount !== '0' ? (
              <div className="container-msg transaction-balance-message">
                <b>
                  &emsp;&ensp;Available balance in the account{' '}
                  <span className="tezos-icon">
                    {this.props.selectedContractAmountBalance} ꜩ
                  </span>
                </b>
              </div>
            ) : (
                ''
              )}
            <span className="error-msg">{this.state.senderAccountErr}</span>
            <div className="modal-input">
              <div className="input-container">To* </div>
              <Autosuggest
                suggestions={suggestions}
                className="form-control"
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                alwaysRenderSuggestions
              />
            </div>
            <span className="error-msg">{this.state.recieverAccountErr}</span>
            <div className="modal-input">
              <div className="input-container" style={{ width: '28%' }}>
                Amount{'* '}
              </div>
              <input
                type="number"
                min="0"
                name="amount"
                className="form-control"
                placeholder="Enter your amount"
                value={this.state.amount}
                onChange={this.handleInputChange}
                style={{ width: '60%' }}
              />
              <span className="tezos-icon" style={{ marginLeft: '10px' }}>
                {' '}
                ꜩ
              </span>
            </div>
            <span className="error-msg" style={{ width: '85%' }}>
              {this.state.amountErr}
            </span>
            <div className="modal-input">
              <div className="input-container" style={{ width: '28%' }}>
                Gas Price
              </div>
              <input
                type="number"
                min="0"
                name="gasPrice"
                className="form-control"
                placeholder="Enter your gas price eg 2000"
                value={gasPrice}
                onChange={this.handleInputChange}
                style={{ width: '60%' }}
              />
              <span className="tezos-icon" style={{ marginLeft: '10px' }}>
                {' '}
                <b>mu</b>ꜩ
              </span>
            </div>
            <span className="error-msg" style={{ marginRight: '8%' }}>
              {this.state.gasPriceErr}
            </span>
            <br />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  this.props.handleModalToggle();
                  this.props.toggleButtonState();
                }}
              >
                Cancel
              </button>
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
                    disabled={this.props.buttonState}
                    onClick={() => this.handleExecuteTransaction()}
                  >
                    Pay Amount
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionModal;
