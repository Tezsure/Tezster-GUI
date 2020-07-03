/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import Moment from 'react-moment';

class SearchedBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const blocksData = this.props.hasOwnProperty('blockSearch')
      ? [this.props.blockSearch]
      : [];
    const blocks = blocksData.map((elem, index) => {
      return (
        <tr key={elem.hash + index} className="table-row">
          <td className="table-body-cell">
            <p className="account-address-content">{elem.gas_used}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.gas_limit}</p>
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
            <p className="account-address-content">{elem.type || 'N/A'}</p>
          </td>
          <td className="table-body-cell">
            <p className="account-address-content">{elem.block || 'N/A'}</p>
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
                  <h4>MINED ON</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>BLOCK HASH</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>BLOCK TYPE</h4>
                </div>
              </th>
              <th scope="col">
                <div className="cards-header">
                  <h4>BLOCK ID</h4>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{blocks}</tbody>
        </table>
      </div>
    );
  }
}

export default SearchedBlock;
