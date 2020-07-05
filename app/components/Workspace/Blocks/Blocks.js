/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';

class Blocks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const blocksData = this.props.blocks.hasOwnProperty('blockDataResponse')
      ? this.props.blocks.blockDataResponse.ops
      : [];
    const blocks = blocksData.map((elem, index) => {
      return (
        <div key={elem.hash + index} className="block-cards">
          <div className="block-contents">
            <div className="gas-used details-container">{`Gas-used: ${elem.gas_used}`}</div>
            <div className="gas-limit details-container">{`Gas-limit: ${elem.gas_limit}`}</div>
            <div className="time details-container">{`Time: ${elem.time}`}</div>
            <div className="hash details-container">{`Hash: ${
              elem.hash || 'N/A'
            }`}</div>
            <div className="type details-container">{`Type: ${
              elem.type || 'N/A'
            }`}</div>
            <div className="block  details-container">{`Block: ${
              elem.block || 'N/A'
            }`}</div>
          </div>
        </div>
      );
    });
    return <div className="block-cards-container">{blocks}</div>;
  }
}

export default Blocks;
