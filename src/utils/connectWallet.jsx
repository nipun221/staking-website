import { ethers, Contract } from 'ethers';
import stakingAbi from '../ABI/stakingAbi.json';
import stakeTokenAbi from '../ABI/stakeTokenAbi.json';

export const connectWallet = async () => {
    try {
        let [signer, provider, stakingContract, stakeTokenContract, chainId, balance] = [null, null, null, null, null, null];
        const stakingContractAddress = import.meta.env.VITE_STAKING_CONTRACT_ADDRESS;
        const stakeTokenContractAddress = import.meta.env.VITE_STAKE_TOKEN_CONTRACT_ADDRESS;

        if (window.ethereum == null) {
            throw new Error("Metamask is not installed! Kindly install Metamask Extension!");
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        let chainIdHex = await window.ethereum.request({
            method: "eth_chainId",
        });

        chainId = parseInt(chainIdHex, 16);
        let selectedAccount = accounts[0];

        if (selectedAccount == null) {
            throw new Error("Please select an ethereum account to continue!");
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = provider.getSigner();

        stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer);

        const balanceWei = await await provider.getBalance(selectedAccount);
        balance = ethers.formatUnits(balanceWei.toString(), 18);

        return {provider, selectedAccount, stakingContract, stakeTokenContract, chainId, balance};
    } catch (error) {
        console.error(error);
        throw error;
    }
}