const express = require("express");
const router = express.Router();
const { createToken } = require("../services/hederaClient");
const { uploadMetadata } = require("../services/ipfs");

router.post("/create", async (req, res) => {
  try {
    const { property, token } = req.body; // property: {address, description, appraisedValue}, token: {name,symbol,totalSupply}
    // 1. upload metadata about property to IPFS
    const metadataCid = await uploadMetadata({ property, token });
    // 2. create HTS token (treasury = operator)
    const tokenId = await createToken({ name: token.name, symbol: token.symbol, initialSupply: token.totalSupply });
    // 3. return tokenId and metadata CID to frontend
    res.json({ tokenId, metadataCid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
