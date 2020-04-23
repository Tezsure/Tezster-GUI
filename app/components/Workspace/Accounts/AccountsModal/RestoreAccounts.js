import React, { Component } from 'react';

class RestoreAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRestoreAccount = this.handleRestoreAccount.bind(this);
  }

  handleRestoreAccount() {
    let errFlag = false;
    const stateParams = {
      ...this.state,
      mnemonicErr: '',
      emailErr: '',
      passwordErr: '',
    };
    if (stateParams.mnemonic === '') {
      credD.mnemonicErr = 'Please enter mnemonic';
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
      let cred = stateParams.email + stateParams.password;
      const keys = eztz.crypto.generateKeys(stateParams.mnenomics, cred);
      const account = keys.pkh;
      let userParams = {
        pk: keys.pk,
        email: stateParams.email,
        password: stateParams.password,
        pkh: keys.pkh,
        secret: keys.sk,
        mnemonic: stateParams.mnemonic,
      };
      this.props.restoreFaucetAccountAction({
        ...userParams,
        ...this.props,
      });
    } else {
      this.setState(stateParams);
    }
  }

  handleInputChange(event) {
    if (event.target.name === 'mnemonic') {
      const mnemonic = event.target.value
        .split('"')
        .join('')
        .replace(/\n/g, '')
        .replace(/\s/g, '')
        .split(',')
        .join(' ');
      this.setState({ mnemonic });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Restore Wallet</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              this.props.handleModalToggle('');
              this.props.toggleButtonState();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            Node provider is connected : {this.props.dashboardHeader.rpcServer}
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
          <p>Seed Words/Mnenomics</p>
          <textarea
            name="mnemonic"
            rows="4"
            cols="40"
            placeholder="Enter seed words/mnemonic"
            value={this.state.mnemonic}
            onChange={this.handleInputChange}
            className="textArea form-control"
          />
          <br />
          <span className="error-msg">{this.state.mnemonicErr}</span>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-success"
            disabled={this.props.buttonState}
            onClick={() => this.handleRestoreAccount()}
          >
            {this.props.buttonState
              ? 'Please wait....'
              : 'Restore Wallet Account'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              this.props.handleModalToggle('');
              this.props.toggleButtonState();
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default RestoreAccounts;
