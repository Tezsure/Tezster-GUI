/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import Moment from 'react-moment';

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
            <div className="gas-used details-container">
              <b>Gas-used:</b> {`${elem.gas_used}`}
            </div>
            <div className="gas-limit details-container">
              <b>Gas-limit:</b> {`${elem.gas_limit}`}
            </div>
            <div className="time details-container">
              <b>Time:</b> <Moment>{`${elem.time}`}</Moment>
            </div>
            <div className="hash details-container">
              <b>Hash:</b> {`${elem.hash || 'N/A'}`}
            </div>
            <div className="type details-container">
              <b>Type:</b> {`${elem.type || 'N/A'}`}
            </div>
            <div className="block  details-container">
              <b>Block:</b> {`${elem.block || 'N/A'}`}
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

export default Blocks;
