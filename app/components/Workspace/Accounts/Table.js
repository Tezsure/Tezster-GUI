import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Accounts = this.props.userAccounts.map((elem, index) => {
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
    if (
      this.props.userAccounts === [] ||
      this.props.userAccounts.length === 0
    ) {
      return (
        <div className="accounts-table-container">
          <p>
            No account available for the selected network type please add an
            account
          </p>
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
