/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { networkId } = this.props.dashboardHeader;
    const { tezsterShowStopNodes, userAccounts } = this.props;
    const Accounts = userAccounts.map((elem, index) => {
      return (
        <tr className="table-row" key={elem.account + index}>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>LABEL</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.label}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>ADDRESS</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.account}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>BALANCE</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {elem.balance} <span className="tezos-icon">ꜩ</span>
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>TX COUNT</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">0</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>INDEX</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">0</p>
            </div>
          </td>
          <td className="table-body-cell">
            <span
              className="icon-key"
              onClick={() => this.props.handleWalletModalShow(elem)}
            />
          </td>
        </tr>
      );
    });
    if (this.props.userAccounts.length === 0) {
      let msg;
      if (!tezsterShowStopNodes && networkId === 'Localnode') {
        msg = 'LocalNodes are not running please start the nodes.';
      } else if (networkId === 'Localnode') {
        msg = (
          <>
            We currently donot support running LocalNodes on your Operating
            System.
            <br />
            Please change network type to Carthagenet.
          </>
        );
      } else if (networkId !== 'Localnode' && userAccounts.length === 0) {
        msg =
          'No accounts available on the selected network please add an account.';
      }
      return (
        <div className="accounts-table-container">
          <p>{msg}</p>
        </div>
      );
    }
    return (
      <div className="accounts-table-container">
        <table className="table table-striped table-bordered">
          <tbody>{Accounts}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
