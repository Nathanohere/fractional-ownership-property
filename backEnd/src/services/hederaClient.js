const { Client, PrivateKey, TokenCreateTransaction, TokenType, TokenSupplyType, Hbar } = require("@hashgraph/sdk");
const env = require("../config/env");

const client = Client.forTestnet();
client.setOperator(env.ACCOUNT_ID, PrivateKey.fromString(env.PRIVATE_KEY));

async function createToken({ name, symbol, decimals = 2, initialSupply = 0 }) {
  const tx = await new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setDecimals(decimals)
    .setInitialSupply(initialSupply)
    .setTokenType(TokenType.FungibleCommon)
    .setSupplyType(TokenSupplyType.Finite)
    .setTreasuryAccountId(env.ACCOUNT_ID)
    .setAdminKey(PrivateKey.fromString(env.PRIVATE_KEY).publicKey)
    .setSupplyKey(PrivateKey.fromString(env.PRIVATE_KEY).publicKey)
    .setMaxTransactionFee(new Hbar(30))
    .execute(client);

  const receipt = await tx.getReceipt(client);
  return receipt.tokenId.toString();
}

module.exports = { createToken, client };
