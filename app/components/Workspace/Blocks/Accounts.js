/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { blockSearch } = this.props;
    const accountsData = () => {
      switch (true) {
        case blockSearch[0] === undefined &&
          Object.keys(blockSearch).length > 0:
          return [blockSearch];
        case blockSearch[0] === undefined:
          return [];
        case blockSearch.length > 0:
          return blockSearch;
        default:
          return [];
      }
    };
    const accounts = accountsData().map((elem, index) => {
      return (
        <div key={elem.hash + index} className="block-cards">
          <div className="block-contents">
            <div className="gas-used details-container">
              <b>Address:</b> {`${elem.address || 'N/A'}`}
            </div>
            <div className="gas-limit details-container">
              <b>Full Balance:</b> {`${elem.total_balance.toFixed(2) || 'N/A'}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="gas-limit details-container">
              <b>Spendable Balance:</b>{' '}
              {`${elem.spendable_balance.toFixed(2) || 'N/A'}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="time details-container">
              <b>Total fees paid:</b> {`${elem.total_fees_paid || 'N/A'}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="hash details-container">
              <b>Total burned:</b> {`${elem.total_burned || 'N/A'}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="type details-container">
              <b>Transactions/Operations:</b> {`${elem.n_tx} / ${elem.n_ops}`}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="block-cards-container">
        {accounts.length === 0 ? 'No Data found' : accounts}
      </div>
    );
  }
}

export default Accounts;
