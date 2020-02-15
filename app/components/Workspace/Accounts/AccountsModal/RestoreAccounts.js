import React, { Component } from 'react';

class RestoreAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      secretKey: '',
      accountLabel: '',
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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
            onClick={() => this.props.handleModalToggle('')}
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
        <div className="modal-input">
          <div className="input-container">Account Label </div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter account label"
            onChange={this.handleInputChange}
            value={this.state.accountLabel}
            name="accountLabel"
          />
        </div>
        <div className="modal-footer">
          {this.props.dashboardHeader.networkId === 'Localnode' ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.props.handleCreateAccount({ ...this.state })}
            >
              Restore Wallet Account
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                this.props.restoreAccountAction({
                  ...this.state,
                  ...this.props
                })
              }
            >
              Activate Babylonnet Account
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => this.props.handleModalToggle('')}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default RestoreAccounts;
