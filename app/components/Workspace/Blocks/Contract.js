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
        <div key={elem.address + index} className="block-cards">
          <div className="block-contents">
            <div className="gas-used details-container">
              <b>Address:</b> {`${elem.address}`}
            </div>
            <div className="gas-limit details-container">
              <b>Delegate:</b> {`${elem.delegate}`}
            </div>
            <div className="time details-container">
              <b>Gas-used:</b> {`${elem.gas_used}`}
            </div>
            <div className="hash details-container">
              <b>Gas-price:</b> {`${elem.gas_price}`}
            </div>
            <div className="type details-container">
              <b>Fee:</b> {`${elem.fee || 'N/A'}`}
            </div>
          </div>
        </div>
      );
    });
    return <div className="block-cards-container">{contracts}</div>;
  }
}

export default Contracts;
