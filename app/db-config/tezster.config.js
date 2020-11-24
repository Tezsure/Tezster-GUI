/* eslint-disable prettier/prettier */
const ip = require('docker-ip');

module.exports = {
  TEZSTER_IMAGE: 'tezsureinc/tezster:1.0.5-beta',
  TEZSTER_CONTAINER_NAME: 'tezster',
  storageName: 'tezster-v2.1.2',
  provider: process.platform.includes('win')
    ? `http://${ip()}:18732`
    : 'http://localhost:18732',
  identities: [
    {
      sk:
        'edskRuR1azSfboG86YPTyxrQgosh5zChf5bVDmptqLTb5EuXAm9rsnDYfTKhq7rDQujdn5WWzwUMeV3agaZ6J2vPQT58jJAJPi',
      pk: 'edpkuBknW28nW72KG6RoHtYW7p12T6GKc7nAbwYX5m8Wd9sDVC9yav',
      pkh: 'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
      label: 'bootstrap1',
    },
    {
      sk:
        'edskRkJz4Rw2rM5NtabEWMbbg2bF4b1nfFajaqEuEk4SgU7eeDbym9gVQtBTbYo32WUg2zb5sNBkD1whRN7zX43V9bftBbtaKc',
      pk: 'edpktzNbDAUjUk697W7gYg2CRuBQjyPxbEg8dLccYYwKSKvkPvjtV9',
      pkh: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN',
      label: 'bootstrap2',
    },
    {
      sk:
        'edskS3qsqsNgdjUqeMsVcEwBn8dkZ5iDRz6aF21KhcCtRiAkWBypUSbicccR4Vgqm9UdW2Vabuos6seezqgbXTrmcbLUG4rdAC',
      pk: 'edpkuTXkJDGcFd5nh6VvMz8phXxU3Bi7h6hqgywNFi1vZTfQNnS1RV',
      pkh: 'tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU',
      label: 'bootstrap3',
    },
    {
      sk:
        'edskRg9qcPqaVQa6jXWNMU5p71tseSuR7NzozgqZ9URsVDi81wTyPJdFSBdeakobyHUi4Xgu61jgKRQvkhXrPmEdEUfiqfiJFL',
      pk: 'edpkuFrRoDSEbJYgxRtLx2ps82UdaYc1WwfS9sE11yhauZt5DgCHbU',
      pkh: 'tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv',
      label: 'bootstrap4',
    },
    {
      sk:
        'edskS7rLN2Df3nbS1EYvwJbWo4umD7yPM1SUeX7gp1WhCVpMFXjcCyM58xs6xsnTsVqHQmJQ2RxoAjJGedWfvFmjQy6etA3dgZ',
      pk: 'edpkv8EUUH68jmo3f7Um5PezmfGrRF24gnfLpH3sVNwJnV5bVCxL2n',
      pkh: 'tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv',
      label: 'bootstrap5',
    },
  ],
  accounts: {
    Localnode: [
      {
        label: 'bootstrap_1',
        pkh: 'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
        identity: 'bootstrap1',
      },
      {
        label: 'bootstrap_2',
        pkh: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN',
        identity: 'bootstrap2',
      },
      {
        label: 'bootstrap_3',
        pkh: 'tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU',
        identity: 'bootstrap3',
      },
      {
        label: 'bootstrap_4',
        pkh: 'tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv',
        identity: 'bootstrap4',
      },
      {
        label: 'bootstrap_5',
        pkh: 'tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv',
        identity: 'bootstrap5',
      },
    ],
    Delphinet: [],
    Mainnet: [],
  },
  contracts: {
    Delphinet: [],
    Localnode: [],
    Mainnet: [],
  },
  programs: [],
  Nodes: [
    'Localnode',
    'Delphinet-Tezster',
    'Delphinet-Smartpy',
    'Mainnet-Smartpy',
  ],
  apiEndPoints: {
    Localnode: process.platform.includes('win')
      ? `http://${ip()}:18732`
      : 'http://localhost:18732',
    'Delphinet-Smartpy': 'https://delphinet.smartpy.io',
    'Delphinet-Tezster': 'https://testnet.tezster.tech',
    'Mainnet-Smartpy': 'https://mainnet.smartpy.io',
  },
  TzStatsApiEndpoint: {
    Localnode: process.platform.includes('win')
      ? `http://${ip()}:18732`
      : 'http://localhost:18732',
    'Delphinet-Smartpy': 'https://api.delphi.tzstats.com',
    'Delphinet-Tezster': 'https://api.delphi.tzstats.com',
    'Mainnet-Smartpy': 'https://api.tzstats.com',
  },
  ConseilJS: {
    Delphinet: {
      url: 'https://conseil-dev.cryptonomic-infra.tech',
      apiKey: '60d7bbd0-ad43-4768-9ee3-64c722874f96',
    },
    Mainnet: {
      url: 'https://conseil-prod.cryptonomic-infra.tech',
      apiKey: '19f49afb-c33d-4251-8565-e95121df519d',
    },
  },
  transactions: {
    Delphinet: [],
    Localnode: [],
    Mainnet: [],
  },
};
