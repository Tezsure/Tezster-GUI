/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';

class SearchedBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const blocksData = this.props.hasOwnProperty('blockSearch')
      ? this.props.blockSearch
      : [];
    const blocks = blocksData.map((elem, index) => {
      return (
        <div key={elem[1] + index} className="block-cards">
          <div className="block-contents">
            <div className="gas-limit details-container">
              <b>Type:</b> {`${elem[3]}`}
            </div>
            <div className="gas-used details-container">
              <b>Sender:</b> {`${elem[1]}`}
            </div>
            <div className="gas-limit details-container">
              <b>Reciever:</b> {`${elem[2] || 'N/A'}`}
            </div>
            <div className="time details-container">
              <b>Amount/Reward:</b> {`${elem[5]}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="hash details-container">
              <b>Fee:</b> {`${elem[6]}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="type details-container">
              <b>Hash:</b> {`${elem[4]}`}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="block-cards-container">
        {blocks.length === 0 ? 'No Data found' : blocks}
      </div>
    );
  }
}

export default SearchedBlock;
