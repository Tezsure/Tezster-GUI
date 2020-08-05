/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Blocks from './Blocks';
import Contract from './Contract';
import Accounts from './Accounts';
import Operations from './Operations';
import SearchedBlock from './SearchedBlock';
import 'react-circular-progressbar/dist/styles.css';
import RefreshIcon from './RefreshIcon';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerLoading: false,
    };
    this.handleSpinnerloading = this.handleSpinnerloading.bind(this);
  }

  handleSpinnerloading() {
    const { spinnerLoading } = this.state;
    this.props.getBlockHeadsAction(this.props);
    this.setState({ spinnerLoading: !spinnerLoading }, () => {
      setTimeout(() => {
        this.setState({ spinnerLoading });
      }, 1000);
    });
  }

  render() {
    const { searchText } = this.props;
    const { blockDataResponse } = this.props.blocks;
    const { networkId } = this.props.blocks;
    const showBlockData =
      networkId !== 'Localnode' &&
      ((this.props.blocks.hasOwnProperty('blockDataResponse') &&
        this.props.blocks.blockDataResponse.length !== 0) ||
        this.props.hasOwnProperty('blockSearch'));
    const ExplorerComponent = function (props) {
      switch (true) {
        case searchText === undefined || searchText === '':
          return <Blocks {...props} />;
        case searchText.startsWith('KT'):
          return <Contract {...props} />;
        case searchText.startsWith('tz'):
          return <Accounts {...props} />;
        case searchText.startsWith('op'):
          return <Operations {...props} />;
        case searchText.startsWith('oo'):
          return <Operations {...props} />;
        case searchText.startsWith('BM'):
          return <SearchedBlock {...props} />;
        case searchText.startsWith('BK'):
          return <SearchedBlock {...props} />;
        case searchText.startsWith('BL'):
          return <SearchedBlock {...props} />;
        default:
          return <div>NOT FOUND</div>;
      }
    };
    return (
      <div className="blocks-container accounts-container">
        {showBlockData && blockDataResponse ? (
          <div className="blocks-sidebar-container sidebar-container">
            <div className="blocks-cycle-container">
              <div
                className="cards"
                style={{ textAlign: 'center', markerBottom: '0.5rem' }}
              >
                <div className="cards-header blocks-cards-header">
                  <CircularProgressbar
                    value={blockDataResponse.progress || 0}
                    text="ꜩ"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                      backgroundColor: '#3dcc8e',
                      textColor: '#fff',
                      pathColor: '#fff',
                      trailColor: 'transparent',
                      width: '50%',
                    })}
                  />
                </div>
              </div>
              <div className="cards blocks-cards">
                <div className="cards-header">
                  <h4>{Math.floor(blockDataResponse.cycle) || 'N/A'}</h4>
                </div>
                <div
                  className="cards-contents"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <p>Current cycle</p>
                  <RefreshIcon
                    {...this.state}
                    handleSpinnerloading={this.handleSpinnerloading}
                  />
                </div>
              </div>
              <div className="cards blocks-cards">
                <div className="cards-header">
                  <h4>{blockDataResponse.height || 'N/A'}</h4>
                </div>
                <div className="cards-contents">
                  <p>Latest Block</p>
                </div>
              </div>
              <div className="cards blocks-cards">
                <div className="cards-header">
                  <h4>{blockDataResponse.blocks_per_cycle || 'N/A'}</h4>
                </div>
                <div className="cards-contents">
                  <p>Blocks per cycle</p>
                </div>
              </div>
              <div className="cards blocks-cards">
                <div className="cards-header">
                  <h4>1.25 ꜩ</h4>
                </div>
                <div className="cards-contents">
                  <p>Endorsement reward</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {networkId === 'Localnode'
              ? 'Support to display blocks on localnode will be added soon.'
              : 'No blocks found'}
          </div>
        )}
        {showBlockData && blockDataResponse
          ? ExplorerComponent(this.props)
          : ''}
      </div>
    );
  }
}

export default index;
