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
      gasPrice: '',
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

  handleAutosuggestOnChange(event) {
    this.setState({
      recieverAccount: event.target.value
        ? event.target.value
        : event.target.innerText,
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    const { userAccounts } = this.props;

    const inputValue = value;
    const inputLength = inputValue.length;

    const suggestions =
      inputLength === 0
        ? []
        : userAccounts.filter(
            (elem) => elem.account.slice(0, inputLength) === inputValue
          );
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
    if (stateParams.gasPrice === '') {
      stateParams.gasPriceErr = 'Please enter gas price';
      errorFlag = true;
    }
    if (parseInt(stateParams.gasPrice, 10) < 1500) {
      stateParams.gasPriceErr =
        'Please enter gas price more than or equals to 1500';
      errorFlag = true;
    }

    if (!errorFlag) {
      this.props.executeTransactionAction({
        ...this.props,
        ...this.state,
      });
    } else {
      this.setState(stateParams);
    }
  }

  handleInputChange(event) {
    const argsName = event.target.name;
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

  render() {
    const { recieverAccount, suggestions } = this.state;
    const sendersAccounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {`${elem.label}-${elem.account}`}
      </option>
    ));

    const getSuggestionValue = (suggestion) => {
      return suggestion.account;
    };

    // Use your imagination to render suggestions.
    const renderSuggestion = (suggestion) => {
      return <div value={suggestion.account}>{suggestion.account}</div>;
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
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Transfer/Send Tezos</h5>
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
              <div className="container-msg">
                <b>
                  &nbsp;Available balance in the account{' '}
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
              />
            </div>
            <span className="error-msg">{this.state.recieverAccountErr}</span>
            <div className="modal-input">
              <div className="input-container" style={{ width: '28%' }}>
                Amount{'* '}
              </div>
              <input
                type="number"
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
            <span className="error-msg">{this.state.amountErr}</span>
            <div className="modal-input" style={{ paddingBottom: '0px' }}>
              <p style={{ paddingBottom: '0px', marginBottom: '0px' }}>
                Note: Please enter gas price more than or equals to 1500 <br />{' '}
              </p>
            </div>
            <div className="modal-input">
              <div className="input-container" style={{ width: '28%' }}>
                Gas Price{'* '}
              </div>
              <input
                type="number"
                name="gasPrice"
                className="form-control"
                placeholder="Enter your gas price eg 1500"
                value={this.state.gasPrice}
                onChange={this.handleInputChange}
                style={{ width: '60%' }}
              />
              <span className="tezos-icon" style={{ marginLeft: '10px' }}>
                {' '}
                <b>mu</b>ꜩ
              </span>
            </div>
            <span className="error-msg">{this.state.gasPriceErr}</span>
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
              <button
                type="button"
                className="btn btn-success"
                disabled={this.props.buttonState}
                onClick={() => this.handleExecuteTransaction()}
              >
                {this.props.buttonState ? 'Please wait....' : 'Pay Amount'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionModal;
