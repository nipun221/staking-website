import { useContext } from "react";
import Web3Context from "../../context/Web3Context";

const AccountBalance = () => {
    const { balance } = useContext(Web3Context);
    return (
        <div>
            <p className="account-balance">
                {balance ? `Account Balance: ${balance}` : "Connect Wallet!"}
            </p>
        </div>
    );
}

export default AccountBalance;