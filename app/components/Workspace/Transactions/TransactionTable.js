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
      const transactionData = elem.hasOwnProperty('tx') ? elem.tx : elem;
      const balance = `${(transactionData.amount / 1000000).toFixed(3)}Tz`;
      const opHash = elem.hasOwnProperty('op') ? elem.op.opHash : 'N/A';
      return (
        <tr className="table-row" key={`trn-${index}`}>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>SOURCE</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {transactionData.source}
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>DESTINATION</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {transactionData.destination}
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>AMOUNT</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{balance}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>OP HASH</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{opHash}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="transaction-status">success</div>
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
