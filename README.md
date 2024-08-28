# METACRAFTERS BANK APPLICATION

>  A Simple Web3 application for connecting to your Metamask wallet and transfer Ether and personalizing your account. 

## Description 

This is an intuitive web3 application created using HTML, CSS, and Solidity. It leverages the power of Ethereum networks to provide a decentralized banking experience. With this dApp, users can easily deploy a contract and transfer Ether and personalize their account names. The application is built using Solidity smart contracts, the powerful Ethers.js library, and uses the user-friendly MetaMask wallet extension.

---

## Technologies Used 🛠️

This project utilizes the following technologies:

- **Solidity**: Solidity is a programming language specifically designed for writing smart contracts on the Ethereum platform. It is used to write the Bank smart contract in this project. [Learn more about Solidity](https://docs.soliditylang.org/).

- **Ethers.js**: Ethers.js is a JavaScript library that provides a concise and consistent API for interacting with Ethereum and Ethereum-like networks. It is used to interact with the Ethereum blockchain and execute transactions in this project. [Explore Ethers.js](https://docs.ethers.org/v5/).

- **MetaMask**: MetaMask is a popular browser extension wallet that allows users to manage Ethereum accounts and interact with decentralized applications. It is used to connect to the Ethereum network and perform transactions in this project. [Get MetaMask](https://metamask.io/).

- **Hardhat**: Hardhat is a development environment and testing framework for Ethereum smart contracts. It provides tools for compiling, deploying, and testing contracts. Hardhat is used to compile and deploy the Bank smart contract in this project. [Discover Hardhat](https://hardhat.org/).

Feel free to explore the provided links to learn more about each technology. 🚀

## Installation ⬇️

### Follow these steps to run this project locally on your system

1. Download or clone the project.
2. Install the dependencies by running `npm install`.
3. Start the local blockchain using Hardhat by running `npx hardhat node`.
4. Open new terminal and deploy the Bank contract `npx hardhat run --network localhost scripts/deploy.js`.
5. Start the development server by running `npm run dev`.

### Configure MetaMask to use the Hardhat node 🦊

1. Open the MetaMask extension in your browser.
2. Click on the account icon in the top right corner and select "Settings".
3. In the "Networks" tab, click on "Add Network".
4. Fill in the following details:
   - Network Name: hardhat-test-network
   - RPC URL: http://127.0.0.1:8545/
   - Chain ID: 31337
   - Currency Symbol: GO or ETH
5. Click on "Save" to add the Hardhat network to MetaMask.

### Add accounts using private keys by Hardhat for testing 🔑

1. In the MetaMask extension, click on the account icon in the top right corner.
2. Select "Import Account" or "Import Account using Private Key" (depending on your version of MetaMask).
3. In the "Private Key" field, enter one of the private keys provided by Hardhat.
   - To access the list of private keys, open the terminal where you started the Hardhat local network.
   - The private keys are displayed as part of the accounts generated by Hardhat.
4. Click on "Import" to import the account into MetaMask.
5. Repeat the above steps to add more accounts for testing purposes.
   

## Usage 🪜

**To use the application, follow these instructions:**

1. After connecting MetaMask to the Hardhat local network, connect your wallet with the application
2. Click on Transfer Funds and fill in the recipient's address and the amount you want to transfer.
3. Click the "Transfer" button to initiate the transaction.
4. Confirm the transaction in MetaMask.
5. The transaction details will be logged to the console, and the account balance will be updated.

**You can also change your account name:**

1. Enter a new name in the input field.
2. Click the "Update Name" button to set the new account name.
3. Confirm the transaction in MetaMask.
4. The account name will be updated, and the change will be reflected in the account details.

## Contract Details 🔗

The smart contract used in this project is named `Bank` present inside the `contracts/Bank.sol` file. It allows users to set an account name and transfer funds. The contract emits events for successful transfers and name updates.

---

This project is open-source !!
