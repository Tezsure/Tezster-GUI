import React, { Component } from 'react';

class RestoreAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      secretKey: '',
<<<<<<< HEAD
      label: '',
=======
      accountLabel: '',
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRestoreAccount = this.handleRestoreAccount.bind(this);
  }

  handleRestoreAccount() {
    let errFlag = false;
    const stateParams = {
      ...this.state,
      mnemonicErr: '',
      secretKeyErr: '',
<<<<<<< HEAD
      labelErr: '',
=======
      accountLabelErr: '',
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
      emailErr: '',
      passwordErr: ''
    };
    if (stateParams.mnemonic === '') {
      stateParams.mnemonicErr = 'Please enter mnemonic';
      errFlag = true;
    }
    if (stateParams.secretKey === '') {
      stateParams.secretKeyErr = 'Please enter secret key';
      errFlag = true;
    }
<<<<<<< HEAD
    if (stateParams.label === '') {
      stateParams.labelErr = 'Please enter account label';
=======
    if (stateParams.accountLabel === '') {
      stateParams.accountLabelErr = 'Please enter account label';
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
      errFlag = true;
    }
    if (stateParams.email === '') {
      stateParams.emailErr = 'Please enter email';
      errFlag = true;
    }
    if (stateParams.password === '') {
      stateParams.passwordErr = 'Please enter password';
      errFlag = true;
    }
    if (errFlag === false) {
      this.props.restoreAccountAction({
        ...this.state,
        ...this.props
      });
    } else {
      this.setState(stateParams);
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Restore Account</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
<<<<<<< HEAD
            onClick={() => {
              this.props.handleModalToggle('');
              this.props.toggleButtonState();
            }}
=======
            onClick={() => this.props.handleModalToggle('')}
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Node provider is connected : http://localhost:18731</p>
        </div>
        <div className="modal-body">
          <p>
            For babylonnet Account Email+password+Secret Key is required and
            change node provider to Alphanet
          </p>
        </div>
        <div className="modal-body">
          <p>
            For LocalNode Account Email+password is required and change node
            provider to Local Node
          </p>
        </div>
        <div className="modal-input">
          <div className="input-container">Email Id </div>
          <input
            type="email"
            className="form-control"
            onChange={this.handleInputChange}
            name="email"
            value={this.state.email}
            placeholder="Enter your Email Id"
          />
        </div>
        <span className="error-msg">{this.state.emailErr}</span>
        <div className="modal-input">
          <div className="input-container">Password </div>
          <input
            type="password"
            onChange={this.handleInputChange}
            name="password"
            value={this.state.password}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <span className="error-msg">{this.state.passwordErr}</span>
        <div className="modal-body">
          <p>Seed Words/Mnenomics(leave a space between each word)</p>
          <textarea
            name="mnemonic"
            rows="4"
            cols="40"
            placeholder="Enter seed words/mnemonic"
            value={this.state.mnemonic}
            onChange={this.handleInputChange}
            className="textArea"
          />
          <br />
          <span className="error-msg">{this.state.mnemonicErr}</span>
        </div>
        <div className="modal-input">
          <div className="input-container">Secret Key </div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your secret key"
            onChange={this.handleInputChange}
            value={this.state.secretKey}
            name="secretKey"
          />
        </div>
        <span className="error-msg">{this.state.secretKeyErr}</span>
        <div className="modal-input">
          <div className="input-container">Account Label </div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter account label"
            onChange={this.handleInputChange}
<<<<<<< HEAD
            value={this.state.label}
            name="label"
          />
        </div>
        <span className="error-msg">{this.state.labelErr}</span>
=======
            value={this.state.accountLabel}
            name="accountLabel"
          />
        </div>
        <span className="error-msg">{this.state.accountLabelErr}</span>
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
        <div className="modal-footer">
          {this.props.dashboardHeader.networkId === 'Localnode' ? (
            <button
              type="button"
              className="btn btn-success"
<<<<<<< HEAD
              disabled={this.props.buttonState}
              onClick={() => this.handleRestoreAccount()}
            >
              {this.props.buttonState ? 'loading...' : 'Restore Wallet Account'}
=======
              onClick={() => this.handleRestoreAccount()}
            >
              Restore Wallet Account
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
<<<<<<< HEAD
              disabled={this.props.buttonState}
              onClick={() => this.handleRestoreAccount()}
            >
              {this.props.buttonState
                ? 'loading...'
                : 'Activate Carthagenet Account'}
=======
              onClick={() => this.handleRestoreAccount()}
            >
              Activate Babylonnet Account
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
<<<<<<< HEAD
            onClick={() => {
              this.props.handleModalToggle('');
              this.props.toggleButtonState();
            }}
=======
            onClick={() => this.props.handleModalToggle('')}
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default RestoreAccounts;
