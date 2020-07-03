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
    const accountsData = this.props.hasOwnProperty('blockSearch')
      ? [this.props.blockSearch]
      : [];
    const accounts = accountsData.map((elem, index) => {
      return (
        <tr key={elem.hash + index} className="table-row">
          <td className="table-body-cell">
            <p className="account-address-content">{elem.address}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.delegate}</p>
          </td>
          <td className="table-body-cell">{elem.total_fees_paid}</td>
          <td className="table-body-cell">
            <p className="account-address-content">
              {elem.total_rewards_earned}
            </p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">
              {elem.total_fees_earned || 'N/A'}
            </p>
          </td>
        </tr>
      );
    });
    return (
      <div className="accounts-table-container">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">
                <div className="cards-header">
                  <h4>ADDRESS</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>DELEGATE</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>TOTAL FEES PAID</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>TOTAL REWARDS EARNED</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>TOTAL FEES EARNED</h4>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{accounts}</tbody>
        </table>
      </div>
    );
  }
}

export default Accounts;
