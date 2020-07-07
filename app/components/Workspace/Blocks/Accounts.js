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
        <div key={elem.hash + index} className="block-cards">
          <div className="block-contents">
            <div className="gas-used details-container">{`Address: ${elem.address}`}</div>
            <div className="gas-limit details-container">{`Delegate: ${elem.delegate}`}</div>
            <div className="time details-container">{`Total-fees-paid: ${elem.total_fees_paid}`}</div>
            <div className="hash details-container">{`Total-reward-earned: ${elem.total_rewards_earned}`}</div>
            <div className="type details-container">{`Total-fees-earned: ${elem.total_fees_earned}`}</div>
          </div>
        </div>
      );
    });
    return <div className="block-cards-container">{accounts}</div>;
  }
}

export default Accounts;
