import EarnedReward from "./EarnedReward";
import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";

const DisplayPanel = () => {
    return (
        <div className="display-panel">
            <StakedAmount/>
            <RewardRate/>
            <EarnedReward/>
        </div>
    );
}

export default DisplayPanel;