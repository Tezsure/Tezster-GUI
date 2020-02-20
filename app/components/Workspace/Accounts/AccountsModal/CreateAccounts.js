import React from 'react';

function CreateAccounts(props) {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Create Secure Wallet</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => props.handleModalToggle('')}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          Node provider is connected : http://localhost:18731 For babylonnet
          Account Email+password is required{' '}
          <span className="important-symbol">*</span>
        </p>
      </div>
      <div className="modal-body">
        <p>
          Please write your seed words below and store them in a secure place.
          These can be used to restore your wallet. If you choose to use a
          Passphrase,this will need to be noted down and stored as well{' '}
          <span className="important-symbol">*</span>
        </p>
      </div>
      <div className="modal-body">
        <p>
          dismiss dynamic topic hover goddess six utility chase scare swear dial
          fashion erode connect bid
        </p>
      </div>
      <div className="modal-input">
        <div className="input-container">Optional Key</div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your optional key"
        />
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={() => props.handleModalToggle('')}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => props.handleValidateModalOpen('validate-wallets')}
        >
          Validate Wallet
        </button>
      </div>
    </div>
  );
}

export default CreateAccounts;
