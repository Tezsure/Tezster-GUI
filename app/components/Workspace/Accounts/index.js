import React from 'react';
import Table from './Table';

function Accounts() {
  return (
    <>
      <div className="accounts-container">
        <div className="cards-container">
          <div className="cards">
            <div className="cards-header">
              <h4>Mnemonic ?</h4>
            </div>
            <div className="cards-contents">
              <p>
                walk coconut upper sweet vllage tribe used recipie hope surge
                mom
              </p>
            </div>
          </div>
          <div className="cards">
            <div className="cards-header">
              <h4>HD PATH</h4>
            </div>
            <div className="cards-contents">
              <p>m/44&rsquo; /60&rsquo; /0&rsquo;/0&rsquo; /0/accounts_index</p>
            </div>
          </div>
        </div>
      </div>
      <Table />
    </>
  );
}

export default Accounts;
