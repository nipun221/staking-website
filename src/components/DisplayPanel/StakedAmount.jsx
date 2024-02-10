import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

const StakedAmount = () => {
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [ stakedAmount, setStakedAmount ] = useState("0");

    useEffect(() => {
        const fetchStakedBalance = async () => {
            try {
                if (stakingContract && selectedAccount) {
                    const amountStakedWei = await stakingContract.stakedBalance(selectedAccount)
                    const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(),18);
                    setStakedAmount(amountStakedEth);
                }
            } catch (error) {
                toast.error("Error fetching staked amount");
                console.error(error.message)
            }
        };

        stakingContract && fetchStakedBalance();
    }, [stakingContract, selectedAccount]);

    return(
        <div className="staked-amount">
            <p>
                Staked Amount: {stakedAmount}
            </p>
        </div>
     )
}

export default StakedAmount;