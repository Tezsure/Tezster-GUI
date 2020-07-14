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
        <div key={elem.address + index} className="block-cards">
          <div className="block-contents">
            <div className="type details-container">
              <b>Sender:</b> {`${elem.sender}`}
            </div>
            <div className="gas-used details-container">
              <b>Block:</b> {`${elem.block}`}
            </div>
            <div className="time details-container">
              <b>cycle:</b> {`${elem.cycle}`}
            </div>
            <div className="type details-container">
              <b>Time:</b> <Moment>{`${elem.time}`}</Moment>
            </div>
            <div className="type details-container">
              <b>Deposit:</b> {`${elem.deposit}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="type details-container">
              <b>Reward:</b> {`${elem.reward}`}
              &nbsp;<span className="tezos-icon">ꜩ</span>
            </div>
            <div className="gas-limit details-container">
              <b>Status:</b> {`${elem.status}`}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="block-cards-container">
        {operations.length === 0 ? 'No operations found' : operations}
      </div>
    );
  }
}

export default Operations;
