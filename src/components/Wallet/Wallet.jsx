import { useEffect, useState } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from '../../context/Web3Context';
import Button from "../Button/Button";
import { handleChainChange } from "../../utils/handleChainChange";
import { handleAccountChange } from "../../utils/handleAccountChange";

const Wallet = ({children}) => { 
    const [state, setState] = useState({
        provider: null,
        account: null,
        stakingContract: null,
        stakeTokenContract: null,
        chainId: null,
        balance: null
    })

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.ethereum.on('accountsChanged', () => handleAccountChange(setState));
        window.ethereum.on('chainChanged', () => handleChainChange(setState));
        return()=>{
            window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setState))
            window.ethereum.removeListener('chainChanged',()=>handleChainChange(setState)) 
        }
    }, [])

    const handleWallet = async () => {
        try {
            setIsLoading(true);
            const {
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainId,
                balance
            } = await connectWallet();
            console.log(
                "Connected to wallet!", 
                "provider:", provider, 
                "selectedAccount:", selectedAccount,
                "stakingContract:", stakingContract, 
                "stakeTokenContract:", stakeTokenContract, 
                "chainId:", chainId,
                "balance:", balance
            );
            setState({
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainId,
                balance
            });
        } catch (error) {
            console.error("Error connecting wallet: ", error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <Web3Context.Provider value={state}>
                {children}
            </Web3Context.Provider>
            {isLoading && <p>Loading...</p>}
            <Button onClick={handleWallet} label="Connect Wallet"/>
        </div>
    )
}

export default Wallet;