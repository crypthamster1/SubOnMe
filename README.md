# SubOnMe

This project implements a decentralized subscription system on the Base blockchain.

## Project Structure
- **contracts/**: Solidity smart contracts.
- **frontend/**: React frontend for users to interact with the contract.
- **backend/**: Optional Node.js backend.

## Steps to run the project

1. **Deploy the contract**: Use tools like Remix or Hardhat to deploy the smart contract to the Base testnet.
2. **Frontend setup**:
    - Navigate to `frontend/`
    - Run `npm install` to install dependencies
    - Update `CONTRACT_ADDRESS` in `App.js` with the deployed contract address.
    - Run `npm start` to start the frontend.
3. **Backend setup** (optional):
    - Navigate to `backend/`
    - Run `npm install` to install dependencies.
    - Run `node server.js` to start the backend.
