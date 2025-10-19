import { ethers } from "ethers";

export function getProvider() {
  return new ethers.providers.JsonRpcProvider(import.meta.env.VITE_HASHIO_RPC);
}
