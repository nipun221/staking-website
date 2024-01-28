import { useState } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from '../../context/Web3Context';
import Button from "../Button/Button";

const Wallet = ({children}) => { 
    const [state, setState] = useState({
        provider: null,
        account: null,
        stakingContract: null,
        stakeTokenContract: null,
        chainId: null,
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleWallet = async () => {
        try {
            setIsLoading(true);
            const {
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainId,
            } = await connectWallet();
            console.log(
                "Connected to wallet!", 
                "provider:", provider, 
                "selectedAccount:", selectedAccount,
                "stakingContract:", stakingContract, 
                "stakeTokenContract:", stakeTokenContract, 
                "chainId:", chainId
            );
            setState({
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainId,
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