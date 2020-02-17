import React, { Component } from 'react';

class ValidateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      optionalKey: '',
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitValidateWallet = this.handleSubmitValidateWallet.bind(
      this
    );
  }
  handleSubmitValidateWallet() {
    let errorFlag = false;
    const stateParams = {
      ...this.state,
      mnemonicErr: '',
      optionalKeyErr: '',
      emailErr: '',
      passwordErr: ''
    };
    if (stateParams.mnemonic === '') {
      stateParams.mnemonicErr = 'Please enter mnemonic';
      errorFlag = true;
    }
    if (stateParams.optionalKey === '') {
      stateParams.optionalKeyErr = 'Please enter optional key';
      errorFlag = true;
    }
    if (stateParams.email === '') {
      stateParams.emailErr = 'Please enter email';
      errorFlag = true;
    }
    if (stateParams.password === '') {
      stateParams.passwordErr = 'Please enter password';
      errorFlag = true;
    }
    if (errorFlag === false) {
      this.props.handleCreateAccount({ ...this.state });
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
          <h5 className="modal-title">Validate Wallet</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => this.props.handleModalToggle('')}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            Node provider is connected : http://localhost:18731 Seed
            Words/Mnenomic (leave a space between each word){' '}
            <span className="important-symbol">*</span>
          </p>
          <textarea
            name="mnemonic"
            rows="4"
            cols="50"
            placeholder="Enter seed words/mnemonic"
            value={this.state.mnemonic}
            onChange={this.handleInputChange}
            className="textArea"
          />
          <span className="error-msg">{this.state.mnemonicErr}</span>
        </div>
        <div className="modal-input">
          <div className="input-container">Optional Key</div>
          <input
            type="text"
            name="optionalKey"
            value={this.state.optionalKey}
            className="form-control"
            onChange={this.handleInputChange}
            placeholder="Enter your optional key"
          />
        </div>
        <span className="error-msg">{this.state.optionalKeyErr}</span>
        <div className="modal-input">
          <div className="input-container">Email-Id</div>
          <input
            type="email"
            name="email"
            value={this.state.email}
            className="form-control"
            onChange={this.handleInputChange}
            placeholder="Enter your email id"
          />
        </div>
        <span className="error-msg">{this.state.emailErr}</span>
        <div className="modal-input">
          <div className="input-container">Password*</div>
          <input
            type="password"
            name="password"
            value={this.state.password}
            className="form-control"
            onChange={this.handleInputChange}
            placeholder="Enter your password"
          />
        </div>
        <span className="error-msg">{this.state.passwordErr}</span>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => this.props.handleModalToggle('')}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.handleSubmitValidateWallet()}
          >
            Save changes
          </button>
        </div>
      </div>
    );
  }
}

export default ValidateWallet;
