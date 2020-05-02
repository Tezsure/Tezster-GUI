import React from 'react';

function CreateAccount(props) {
  return (
    <>
      <div className="modal-body">
        <p>
          Node provider is connected : {props.dashboardHeader.rpcServer} <br />
          Note: The account created will be a non fundraiser account.
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
