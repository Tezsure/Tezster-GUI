/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';

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
        <div key={elem.address + index} className="block-cards">
          <div className="block-contents">
            <div className="gas-used details-container">
              <b>Gas-limit:</b> {`${elem.gas_limit}`}
            </div>
            <div className="gas-limit details-container">
              <b>Gas-used:</b> {`${elem.gas_used}`}
            </div>
            <div className="time details-container">
              <b>Gas-price:</b> {`${elem.gas_price}`}
            </div>
            <div className="hash details-container">
              <b>Block:</b> {`${elem.block}`}
            </div>
            <div className="type details-container">
              <b>Time:</b> {`${elem.time}`}
            </div>
            <div className="type details-container">
              <b>Hash:</b> {`${elem.hash}`}
            </div>
            <div className="type details-container">
              <b>Fee:</b> {`${elem.fee}`}
            </div>
            <div className="type details-container">
              <b>Sender:</b> {`${elem.sender}`}
            </div>
            <div className="type details-container">
              <b>Reciever:</b> {`${elem.receiver}`}
            </div>
          </div>
        </div>
      );
    });
    return <div className="block-cards-container">{operations}</div>;
  }
}

export default Operations;
