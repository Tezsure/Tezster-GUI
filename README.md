# Tezster GUI

<img  src="https://tezster.s3-ap-southeast-1.amazonaws.com/TEZSTER_GUI/1_jDB5enULQVo2UfeiwD32qA.png"  alt="tezster GUI banner" align="center" />

<br />

<div align="center"><strong>Start interacting with Tezos Chain within seconds</strong></div>

<div align="center">Use this GUI version of Tezster which is ready to use Desktop app, made with React and Electron. Primarily can be used to interact with Local-Nodes as well as remote Nodes. The below documentation will help you get started with Tezster-GUI, although to get complete understanding of components usage and visual demo follow the visual demo follow <a  href="https://docs.tezster.tech/"><b>Tezster-GUI Guide</b></a>

</div>

<br />

# Getting Started

This project was generated with React.Js & Electron, Follow below steps to get started.

## Prerequisites

1. Node v. 12.x.x
2. Docker v. 2.3.0.2+

_Note: We recommend to install Node LTS version i.e. 12.x.x._

### OS Support

1. Linux (Ubuntu and Debian)
2. Mac OS X
3. Windows 10 <br />

## Installation Process :

- Setup your Node.js environment

* Install and setup [Docker](https://docs.tezster.tech/getting-started/prerequisites#docker-installation)

## Node.js Installation Guide

Run following commands to install Node.js LTS version

    sudo apt-get update
    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt-get install nodejs

After installing verify and check the installed version.

    node -v

_Note: Please make sure you have the latest npm and node.js versions to be 12.x or above._

## Install Tezster-CLI package

[Tezster-CLI](https://docs.tezster.tech/tezster-cli) will create a sandboxed nodes in your local machine and you will be able to interact with it flawlessly with this GUI version.

    sudo npm install -g tezster@latest

Run Following to ensure the installed version of [Tezster-CLI](https://docs.tezster.tech/tezster-cli).

    tezster --version

To start the tester nodes on your machine run:

    tezster start-nodes

## Tezster-GUI App Setup

Inorder to start using the app we clone this repo using the following command

    git clone https://github.com/Tezsure/Tezster-GUI.git
    cd Tezster-GUI/
    sudo npm install

Now to start the app in the `dev` environment run the following command :

    npm run dev

This starts the renderer process in hot-module-replacement mode and starts a webpack dev server that sends hot updates to the renderer process.

_You are now ready to use the app or start the code development._

## Building Packages for All Platforms

Each platform has an associated `npm run` configuration to help you build on each platform more easily. Because each platform has different (but similar) build processes, they require different configuration.

To create the build package for different OS based environment run :

    npm run package

This will create a build package in the `release folder` of the root directory depending upon the OS you're working on.

To create build package for other platform run the following command

    npm run package-all

On linux systems it requires an additional dependency of wine package installer to create a build package for windows environment.‌

_Note: It requires mac `OSX` to build mac package i.e `.dmg` file_

#### On Linux:

Bulding on Linux will create a `.AppImage` file, a `.deb` file and a `.rpm` file in the `release folder` of the root directory. Use the following command for linux build.

    $ npm run package-linux

In order to create an rpm file it requires rpm package installed on your linux machine please follow the below instructions to install rpm package.

    $ sudo apt-get update
    $ sudo apt-get install rpm

#### On Windows:

Building on a windows will create a standard windows `.exe` file.
Run the following command to build

```
$ npm run package-win
```

#### On Mac:

Building on a Mac will create a standard Mac `.dmg` file.
Run the following command to build

```
$ npm run package
```

### Steps to install wine on linux

The WineHQ repository has a set of standard Wine packages that you can download and install on your system. Please follow these steps to do so:

Run the following command in the Terminal for adding i386 architecture before installing a 64-bit version of Wine:

    $ sudo dpkg --add-architecture i386

![Add i386 architecture](https://vitux.com/wp-content/uploads/2018/09/word-image-46.png)

Run the following in order to add the WineHQ signing key:

    $ wget -qO- https://dl.winehq.org/wine-builds/Release.key | sudo apt-key add -

![Download WineHQ key](https://vitux.com/wp-content/uploads/2018/09/word-image-47.png)

**\*Tip:** You can copy this command from this tutorial instead of typing it in the Terminal. Select and copy this command from here, right-click in the Terminal prompt and then select Paste from the menu.\*

Now run the following command in order to add the relevant repository from the WineHQ:

    $ sudo apt-add-repository 'deb http://dl.winehq.org/wine-builds/ubuntu/ artful main'

![Add WineHQ package repository](https://vitux.com/wp-content/uploads/2018/09/word-image-48.png)

Here you have two options about which release of Wine you want to install; the stable version or the development versions.

- **WineHQ Stable:** This is the most recent and stable release of Wine available. Use the following command to install this version:

`$ sudo apt-get install --install-recommends winehq-stable`

![Install Wine from WineHQ](https://vitux.com/wp-content/uploads/2018/09/word-image-49.png)

Please enter _**Y**_ when prompted with a choice of y/n for installation. After that, the stable version of Wine will be installed on your system.

- **WineHQ Development:** This is the most-recent version of Wine but it might not be very stable. As a developer, you might be more interested in installing this version.

`$ sudo apt-get install --install-recommends winehq-devel`

Please enter Y when prompted with a choice of y/n for installation. After that, the development version of Wine will be installed on your system.

In order to verify installation and checking which version is installed on your system, run the following command:

    $ wine --version

## Contribute

There are many ways to contribute to this project. You can develop applications or dApps with it. You can submit bug reports or feature requests.

[`FOR ANY HELP OR TO REPORT ANY ISSUES PLEASE FOLLOW THE LINK`](https://github.com/Tezsure/Tezster-GUI/issues)

‌
