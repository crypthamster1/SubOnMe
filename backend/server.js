const express = require('express');
const { ethers } = require('ethers');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Base Blockchain Subscription Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
