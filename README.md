# Tezster GUI

Use the GUI version of Tezster which is ready to use Desktop app, made with React and Electron. Primarily can be used to interact with Tezster CLI ( i.e Local Node ) as well as remote Testnets.

# Getting Super Powers

This project was generated with React.Js & Electron. Tezster-GUI comes with pretty much the same functionalities as CLI with great user interface for ease of access. New to Tezos ecosystem and want a developer ready environment? We got your back!

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Prerequisites

Any Operating System will work !

1.  Node v. 12.x+
2.  Tezster-CLI

## Installation Process :

- Setup your Node.js environment

- Install and setup [Tezster-CLI](https://github.com/Tezsure/Tezster-CLI)

## Node.js Installation Guide

Run following commands to install Node.js LTS version

    sudo apt-get update
    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt-get install nodejs

After installing verify and check the installed version.

    node -v

# Install Tezster-CLI package

Tezster-CLI will create a sandboxed nodes in your local machine and you will be able to interact with it flawlessly with this GUI version.

    sudo npm install -g tezster@latest

Run Following to ensure the installed version of tezster-CLI.

    tezster --version

To start the nodes run:

    tezster start-nodes

# Tezster-GUI App Setup

‌To setup Tezster-GUI clone the project from github run the following command.

    https://github.com/Tezsure/Tezster-GUI.git

‌
Now thee second step is to navigate to the downloaded directory and run the following command

    npm i --save

‌

Now to start the app in the `dev` environment run the following command :

    npm run dev

‌

This starts the renderer process in hot-module-replacement mode and starts a webpack dev server that sends hot updates to the renderer process.

To create the build package for different OS based environment run :

    npm run package

‌
This will create a build package in the `release folder` of the root directory depending upon the OS you're working on. On linux systems it requires an additional dependency of wine package installer to create a build package.

To create build package for other platform run the following command

    npm run package-all

‌

## **ACCOUNTS**

`CREATE ACCOUNTS`

To add an account with Tezster-GUI simply go to to accounts tab and then click on the create accounts button on top right corner and using the faucet received from [https://faucet.tzalpha.net](https://faucet.tzalpha.net/). We can create an account on the desired network and the account automatically gets activated and revealed on the network.

Please follow the below visual demo :
![enter image description here](https://tezster.s3-ap-southeast-1.amazonaws.com/TEZSTER_GUI/create_account.gif)

_Note : Its only possible to active the accounts which are provided by the faucet, random accounts cannot be activated / revealed in the process._

###

`RESTORE ACCOUNTS`

Restore accounts is used to add already running account to the given network. To restore an already added account follow the simple steps :

- Go to to accounts tab and then click on the restore accounts button on top right corner.
- Fill in your existing account/wallet details and your account will get restored asap to the network with the available balance.

Please follow the below visual demo :
![enter image description here](https://tezster.s3-ap-southeast-1.amazonaws.com/TEZSTER_GUI/deploy_contract.gif)

## **BLOCKS**

‌

Blocks are generally used to show the current block on the chain we don't create any blocks on local-node hence it can only be visible on selected testnets and mainnets.

‌

## **TRANSACTIONS**

**Steps for processing a transaction :**‌

- Select the `Transaction` tab in the dashboard.

- Click on `Transfer tezos` button on the top right corner.

- Select sender's account and receiver's account.

- Enter your transfer amount while also entering gas price.

- Click on Transfer Tezos and then _**viola**_ your amount is transferred to the reciever's account.
  ‌
  Please follow the below visual demo :
  ![enter image description here](https://tezster.s3-ap-southeast-1.amazonaws.com/TEZSTER_GUI/transactions.gif)

## **CONTRACTS**

###

`Deploy Contract`‌

In order to deploy contract go to contracts tab

- Select deploy contract then select wallet.

- Upload contract or copy paste contract.

- Enter contract label while entering amount and initial storage , this will help you to recognise your contract with simple name.

- Click on deploy contract once the contract gets deployed you'll get a contract address returned like this `KT1QfQ9g2zHQkbjdrfWGhbx1eLiSFWn5abLn`

Go to the following link along with contract address to see the contract details in the explorer
[https://carthagenet.tzstats.com/KT1QfQ9g2zHQkbjdrfWGhbx1eLiSFWn5abLn](https://carthagenet.tzstats.com/KT1QfQ9g2zHQkbjdrfWGhbx1eLiSFWn5abLn)

Please follow the below visual demo :
![enter image description here](https://tezster.s3-ap-southeast-1.amazonaws.com/TEZSTER_GUI/deploy_contract.gif)

###

`INVOKE CONTRACT`

In order to Invoke contract go to contracts tab

- Select Invoke contract then select wallet,

- Select your Contract and respective entry points.

- Enter values once the contract gets Invoked you'll get a contract address returned like this `ooF5y5gjRxZXBzgm8ZurvfhriVNqtrnm51ri5e9BCkmjyjYQuhx`

- Then go to the following link along with contract address to see the invocation changes
  [`https://carthagenet.tzstats.com/ooF5y5gjRxZXBzgm8ZurvfhriVNqtrnm51ri5e9BCkmjyjYQuhx`](https://carthagenet.tzstats.com/ooF5y5gjRxZXBzgm8ZurvfhriVNqtrnm51ri5e9BCkmjyjYQuhx)

Please follow the below visual demo :
![enter image description here](https://tezster.s3-ap-southeast-1.amazonaws.com/TEZSTER_GUI/call_contract.gif)

###

`CALL CONTRACT`

In order to get initial storage of the contract go to contracts tab‌

- Select View Contract Storage.

- `Select Contracts` will show the deployed contract.

Please follow the below visual demo :
![enter image description here](https://tezster.s3-ap-southeast-1.amazonaws.com/TEZSTER_GUI/call-storage.gif)

#

`FOR ANY HELP OR TO REPORT ANY ISSUES PLEASE FOLLOW THE LINK`

‌

[`https://github.com/Tezsure/Tezster-GUI/issues`](https://github.com/Tezsure/Tezster-GUI/issues)
