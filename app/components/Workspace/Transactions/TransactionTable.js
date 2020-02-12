import React, { Component } from 'react';

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Transactions = this.props.userTransactions.map(elem => {
      return (
        <tr className="table-row" key={elem.op.opHash}>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>SOURCE</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.tx.source}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>DESTINATION</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.tx.destination}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>AMOUNT</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.tx.amount}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>OP HASH</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.op.opHash}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="transaction-status">
              {elem.tx.operationResultStatus}
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
