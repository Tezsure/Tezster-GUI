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
    const { blockSearch } = this.props;
    const ContractsData = () => {
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
    const contracts = ContractsData().map((elem, index) => {
      return (
        <div key={elem.address + index} className="block-cards">
          <div className="block-contents">
            <div className="gas-used details-container">
              <b>Address:</b> {`${elem.address}`}
            </div>
            <div className="gas-limit details-container">
              <b>Delegate:</b> {`${elem.delegate}` || 'N/A'}
            </div>
            <div className="time details-container">
              <b>Gas-used:</b> {`${elem.gas_used}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="hash details-container">
              <b>Gas-price:</b> {`${elem.gas_price}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="type details-container">
              <b>Fee:</b> {`${elem.fee || 'N/A'}`}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="block-cards-container">
        {contracts.length === 0 ? 'No Data found' : contracts}
      </div>
    );
  }
}

export default Contracts;
