import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import {
  Client,
  Hbar,
  TokenCreateTransaction,
  TokenMintTransaction,
  TokenType,
  TokenSupplyType,
  TokenAssociateTransaction,
  TransferTransaction,
  PrivateKey,
  AccountId,
} from '@hashgraph/sdk';

dotenv.config();

console.log('MY_ACCOUNT_ID:', process.env.MY_ACCOUNT_ID);
console.log(
  'MY_PRIVATE_KEY:',
  process.env.MY_PRIVATE_KEY ? 'Loaded ✅' : 'Missing ❌'
);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const accountId = process.env.MY_ACCOUNT_ID;
const privateKey = process.env.MY_PRIVATE_KEY;

if (!accountId || !privateKey) {
  throw new Error('❌ Missing MY_ACCOUNT_ID or MY_PRIVATE_KEY in .env file');
}

// Initialize Hedera client
const client = Client.forTestnet();
client.setOperator(
  AccountId.fromString(process.env.MY_ACCOUNT_ID),
  PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY)
);

const TOKENS_FILE = './data/tokens.json';
await fs.ensureFile(TOKENS_FILE);
const tokens = (await fs.readJson(TOKENS_FILE).catch(() => [])) || [];

/**
 * 🪙 Create a new fractional property token
 */
app.post('/api/token/create', async (req, res) => {
  try {
    const { propertyName, totalShares, ownerAccountId } = req.body;

    console.log('Creating token:', propertyName);

    const tx = new TokenCreateTransaction()
      .setTokenName(propertyName)
      .setTokenSymbol(propertyName.slice(0, 4).toUpperCase())
      .setTokenType(TokenType.FungibleCommon)
      .setTreasuryAccountId(process.env.MY_ACCOUNT_ID)
      .setInitialSupply(0)
      .setDecimals(0)
      .setMaxSupply(Number(totalShares))
      .setSupplyType(TokenSupplyType.Finite)
      .setAdminKey(PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY))
      .setSupplyKey(PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY))
      .setAutoRenewAccountId(process.env.MY_ACCOUNT_ID)
      .setAutoRenewPeriod(7776000)
      .setMaxTransactionFee(new Hbar(10))
      .freezeWith(client);

    const signedTx = await tx.sign(
      PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY)
    );
    const submitTx = await signedTx.execute(client);
    const receipt = await submitTx.getReceipt(client);
    const tokenId = receipt.tokenId.toString();

    const newToken = { tokenId, propertyName, totalShares, ownerAccountId };
    tokens.push(newToken);
    await fs.writeJson(TOKENS_FILE, tokens, { spaces: 2 });

    res.json({ success: true, tokenId });
  } catch (err) {
    console.error('❌ Error creating token:', err);
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/token/mint', async (req, res) => {
  try {
    const { tokenId, amount } = req.body;

    const tx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setAmount(Number(amount))
      .freezeWith(client)
      .sign(PrivateKey.fromString(process.env.MY_PRIVATE_KEY));

    const submitTx = await tx.execute(client);
    const receipt = await submitTx.getReceipt(client);

    res.json({
      success: true,
      status: receipt.status.toString(),
      message: `${amount} new shares minted for token ${tokenId}`,
    });
  } catch (err) {
    console.error('❌ Error minting tokens:', err);
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/token/transfer', async (req, res) => {
  try {
    const { tokenId, fromAccountId, toAccountId, amount } = req.body;

    // Optional: associate token to receiver first (if not yet associated)
    try {
      const associateTx = await new TokenAssociateTransaction()
        .setAccountId(toAccountId)
        .setTokenIds([tokenId])
        .freezeWith(client)
        .sign(PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY));
      await associateTx.execute(client);
    } catch (assocErr) {
      console.log('⚠️ Association skipped or already done');
    }

    const transferTx = await new TransferTransaction()
      .addTokenTransfer(tokenId, fromAccountId, -Number(amount))
      .addTokenTransfer(tokenId, toAccountId, Number(amount))
      .freezeWith(client)
      .sign(PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY));

    const submitTx = await transferTx.execute(client);
    const receipt = await submitTx.getReceipt(client);

    res.json({
      success: true,
      status: receipt.status.toString(),
      message: `Transferred ${amount} shares of ${tokenId} from ${fromAccountId} to ${toAccountId}`,
    });
  } catch (err) {
    console.error('❌ Error transferring tokens:', err);
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/token/list', async (req, res) => {
  res.json(tokens);
});


app.get('/', (req, res) => {
  res.send('FracProp backend with mint & transfer ✅');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
