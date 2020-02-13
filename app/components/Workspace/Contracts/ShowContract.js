import React from 'react';

function ShowContract(props) {
  const Accounts = props.userAccounts.map(elem => (
    <option key={elem.contracts} value={elem.contracts}>
      {elem.contracts}
    </option>
  ));
  return (
    <div className="transactions-contents">
      <div className="modal-input">
        <div className="input-container">Select Wallet </div>
        <select className="custom-select" name="accounts">
          <option value="0" disabled>
            Select account to display transactions
          </option>
          {Accounts}
        </select>
      </div>
      <div className="cards-container">
        <div className="cards button-card accounts-button-container">
          <div className="button-accounts">
            <button type="button" className="btn btn-success">
              Show Contract
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowContract;
