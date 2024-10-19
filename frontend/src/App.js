import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SubscriptionForm from './components/SubscriptionForm';
import './App.css';

const CONTRACT_ADDRESS = "0xYourContractAddress"; // Вставьте адрес развернутого контракта
const CONTRACT_ABI = [/* ABI контракта сюда */];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function initBlockchain() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
    }
    initBlockchain();
  }, []);

  return (
    <div className="App">
      <h1>Base Subscription System</h1>
      {contract && <SubscriptionForm contract={contract} />}
    </div>
  );
}

export default App;
