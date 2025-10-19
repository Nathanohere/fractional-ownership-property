# fracRealEstate— Fractional Real-Estate on Hedera

## Overview
PropShare lets property owners tokenize real estate assets as HTS fungible tokens so investors can buy fractions with low fees and fast finality.

## Features
- Create HTS token representing shares of property
- Metadata stored on IPFS
- Wallet connect via HashConnect
- Purchase fractions, transfer, and view holdings

## Tech Stack
- Backend: Node.js, Express, @hashgraph/sdk
- Frontend: React, Vite, HashConnect, ethers.js
- Storage: IPFS (Pinata)
- Dev tools: Docker (optional), Jest, ESLint, Prettier

## Quickstart (dev)
### Backend
```bash
cd backend
cp .env.example .env
# fill .env
npm install
npm run dev    # nodemon
