/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
// import Moment from 'react-moment';

class Contracts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const ContractsData = this.props.hasOwnProperty('blockSearch')
      ? this.props.blockSearch
      : [];
    const contracts = ContractsData.map((elem, index) => {
      return (
        <tr key={elem.hash + index} className="table-row">
          <td className="table-body-cell">
            <p className="account-address-content">{elem.address}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.delegate}</p>
          </td>
          <td className="table-body-cell">{elem.gas_used}</td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.gas_price}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.fee || 'N/A'}</p>
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
                  <h4>GAS USED</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>GAS PRICE</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>FEE</h4>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{contracts}</tbody>
        </table>
      </div>
    );
  }
}

export default Contracts;
