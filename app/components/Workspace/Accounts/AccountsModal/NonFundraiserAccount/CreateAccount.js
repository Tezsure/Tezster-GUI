import React from 'react';
import JSONPretty from 'react-json-pretty';

function CreateAccount(props) {
  return (
    <>
      <div className="modal-body">
        <p>
          Node provider is connected : {props.dashboardHeader.rpcServer} <br />
          Note: The account created will be a non fundraiser account. <br />
          Note: Password is not a mandatory field, yet password and mnemonic are
          required to restore wallet please save it.
        </p>
      </div>
      <div className="modal-input" style={{ paddingBottom: '0rem' }}>
        <p>Mnemonic</p>
      </div>
      <div className="modal-input" style={{ paddingTop: '0rem' }}>
        <p className="mnemonics-container">
          <code className="mnemonics">
            {props.stateParams.mnemonicSuggestion}
          </code>
        </p>
      </div>
      <div className="modal-input">
        <div className="input-container">Label* </div>
        <input
          type="text"
          className="form-control"
          onChange={props.handleInputChange}
          name="label"
          value={props.stateParams.label}
          placeholder="Enter label for your account"
        />
      </div>
      {props.stateParams.labelErr && (
        <span className="error-msg">{props.stateParams.labelErr}</span>
      )}
      <div className="modal-input">
        <div className="input-container">Password </div>
        <input
          type="password"
          onChange={props.handleInputChange}
          name="password"
          value={props.stateParams.password}
          className="form-control"
          placeholder="Enter your password"
        />
      </div>
      <span className="error-msg">{props.stateParams.passwordErr}</span>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-success"
          disabled={props.buttonState}
          onClick={() => props.handleCreateWallet()}
        >
          {props.buttonState ? 'Please wait....' : 'Create Wallet'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={() => {
            props.handleModalToggle('');
            props.toggleButtonState();
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default CreateAccount;
