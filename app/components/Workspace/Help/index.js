/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url */
import React from 'react';
import { NavLink } from 'react-router-dom';

const { shell } = require('electron');

const GithubIssueLink = 'https://github.com/Tezsure/Tezster-GUI/issues';
const githubIcon = 'https://img.icons8.com/bubbles/2x/github.png';
const telegramIcon =
  'https://images.vexels.com/media/users/3/137414/isolated/preview/3f7486417ddd88060a1818d44b6f3728-telegram-icon-logo-by-vexels.png';
const noImageIcon =
  'https://i.ya-webdesign.com/images/no-image-available-png-3.png';
const TelegramIssueLink = 'https://t.me/tezster';

function index() {
  return (
    <div className="help-section-container">
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>Please follow below link&rsquo;s to create issue on github</h4>
          </div>
          <div className="cards-contents" />
        </div>
      </div>
      <div className="cards-container">
        <div
          className="card"
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '0px',
            marginRight: '4rem',
            cursor: 'pointer',
          }}
        >
          <img
            src={githubIcon}
            className="card-img-top"
            alt={noImageIcon}
            style={{ width: '30%' }}
          />
          <div className="card-body" style={{ width: '30%' }}>
            <p className="card-text" style={{ color: '#727d95' }}>
              To contribute to our development environment or, to keep track of
              our latest feature’s improvement’s or to report an issue please
              follow our Github development{' '}
              <NavLink
                to="#"
                style={{ color: 'blue' }}
                onClick={() => shell.openExternal(GithubIssueLink)}
              >
                link
              </NavLink>
            </p>
          </div>
        </div>
        <div
          className="card"
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '0px',
            marginRight: '4rem',
            cursor: 'pointer',
          }}
        >
          <img
            src={telegramIcon}
            className="card-img-top"
            alt={noImageIcon}
            style={{ width: '30%' }}
          />
          <div className="card-body" style={{ width: '30%' }}>
            <p className="card-text" style={{ color: '#727d95' }}>
              You can also keep track of our latest feature’s improvement’s and
              can get one on one with our developer&rsquo;s{' '}
              <NavLink
                to="#"
                onClick={() => shell.openExternal(TelegramIssueLink)}
                style={{ color: 'blue' }}
              >
                link
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
