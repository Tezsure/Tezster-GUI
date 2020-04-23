import React from 'react';
import JSONPretty from 'react-json-pretty';

function WalletAccounts(props) {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Account Information</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            props.handleModalToggle('');
            props.toggleButtonState();
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Below is the selected wallet information </p>
        <JSONPretty
          id="json-pretty"
          style={{ width: '100%', height: '100%' }}
          data={props.currentAccount}
        />
      </div>
    </div>
  );
}

export default WalletAccounts;
