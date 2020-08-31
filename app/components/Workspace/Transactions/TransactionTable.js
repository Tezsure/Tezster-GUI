/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import React, { Component } from 'react';

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Transactions = this.props.userTransactions.map((elem, index) => {
      let time = 'N/A';
      if (elem.hasOwnProperty('tx')) {
        if (elem.tx.hasOwnProperty('timestamp')) {
          time = new Date(elem.tx.timestamp).toGMTString();
        }
      } else {
        time = new Date(elem.timestamp).toGMTString();
      }
      const transactionData = elem.hasOwnProperty('tx') ? elem.tx : elem;
      const balance = `${(transactionData.amount / 1000000).toFixed(3)}`;
      return (
        <tr className="table-row" key={`trn-${index}`}>
          <td className="table-body-cell" style={{ wordBreak: 'break-word' }}>
            <div className="cards-header">
              <h4>SOURCE</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {transactionData.source}
              </p>
            </div>
          </td>
          <td className="table-body-cell" style={{ wordBreak: 'break-word' }}>
            <div className="cards-header">
              <h4>DESTINATION</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {transactionData.destination}
              </p>
            </div>
          </td>
          <td className="table-body-cell" style={{ wordBreak: 'break-word' }}>
            <div className="cards-header">
              <h4>AMOUNT</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {balance} <span className="tezos-icon">ꜩ</span>
              </p>
            </div>
          </td>
          <td className="table-body-cell" style={{ wordBreak: 'break-word' }}>
            <div className="cards-header" style={{ wordBreak: 'break-word' }}>
              <h4 style={{ wordBreak: 'break-word' }}>TRANSACTION TIME</h4>
            </div>
            <div className="cards-contents" style={{ wordBreak: 'break-word' }}>
              <p
                className="account-address-content"
                style={{ wordBreak: 'break-word' }}
              >
                {time}
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>STATUS</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">success</p>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <div className="accounts-table-container">
        <table className="table table-striped table-bordered">
          <tbody>{Transactions}</tbody>
        </table>
      </div>
    );
  }
}

export default TransactionTable;
