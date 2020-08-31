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
      <div className="card-deck">
        <div className="card">
          <img
            src={githubIcon}
            className="card-img-top"
            alt={noImageIcon}
            style={{ width: '30%', cursor: 'pointer' }}
            onClick={() => shell.openExternal(GithubIssueLink)}
          />
          <div className="card-body">
            <p className="card-text">
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
        <div className="card">
          <img
            src={telegramIcon}
            className="card-img-top"
            alt={noImageIcon}
            style={{ width: '30%', cursor: 'pointer' }}
            onClick={() => shell.openExternal(TelegramIssueLink)}
          />
          <div className="card-body">
            <p className="card-text">
              You can also keep track of our latest feature’s improvement’s and
              can get one on one with our developers
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
