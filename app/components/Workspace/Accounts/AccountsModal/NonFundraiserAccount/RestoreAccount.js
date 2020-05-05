import React from 'react';

function RestoreAccount(props) {
  return (
    <>
      <div className="modal-body">
        <p>
          Node provider is connected : {props.dashboardHeader.rpcServer} <br />
          Note: The account restored will be a non fundraiser account.
        </p>
      </div>
      <div className="modal-input">
        <div className="input-container">Label </div>
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
      {props.stateParams.passwordErr && (
        <span className="error-msg">{props.stateParams.passwordErr}</span>
      )}
      <div className="modal-body">
        <p>Seed Words/Mnenomics</p>
        <textarea
          name="mnemonic"
          rows="4"
          cols="40"
          placeholder="Enter seed words/mnemonic"
          value={props.stateParams.mnemonic}
          onChange={props.handleInputChange}
          className="textArea form-control"
        />
        <br />
        {props.stateParams.mnemonicErr && (
          <span className="error-msg">{props.stateParams.mnemonicErr}</span>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-success"
          disabled={props.buttonState}
          onClick={() => props.handleRestoreWallet()}
        >
          {props.buttonState ? 'Please wait....' : 'Restore Wallet'}
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

export default RestoreAccount;
