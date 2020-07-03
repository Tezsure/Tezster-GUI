/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import Moment from 'react-moment';

class Operations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const SearchData = this.props.hasOwnProperty('blockSearch')
      ? this.props.blockSearch
      : [];
    const operations = SearchData.map((elem, index) => {
      return (
        <tr key={elem.hash + index} className="table-row">
          <td className="table-body-cell">
            <p className="account-address-content">{elem.gas_limit}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.gas_used}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.gas_price}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.block}</p>
          </td>
          <td className="table-body-cell">
            <div className="cards-contents">
              <p className="account-address-content" style={{ width: '270px' }}>
                <Moment>{elem.time}</Moment>
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.hash}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.fee || 'N/A'}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.sender || 'N/A'}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.receiver || 'N/A'}</p>
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
                  <h4>GAS USED</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>GAS LIMIT</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>GAS PRICE</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>BLOCK</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>TIME</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>HASH</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>FEE</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>SENDER</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>RECIEVER</h4>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{operations}</tbody>
        </table>
      </div>
    );
  }
}

export default Operations;
