import React, { useState } from 'react';

function SubscriptionForm({ contract }) {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");

  const createSubscription = async () => {
    const tx = await contract.createSubscription(ethers.utils.parseEther(amount), frequency);
    await tx.wait();
    alert("Subscription created!");
  };

  const paySubscription = async () => {
    const tx = await contract.paySubscription({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    alert("Payment successful!");
  };

  return (
    <div>
      <h2>Create Subscription</h2>
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Frequency (seconds)"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
      <button onClick={createSubscription}>Create Subscription</button>
      <button onClick={paySubscription}>Pay Subscription</button>
    </div>
  );
}

export default SubscriptionForm;
