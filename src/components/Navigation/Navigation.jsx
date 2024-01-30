import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";
const Navigation = () => {
  return(
    <header className="navbar">
      <div className="navbar-btns"></div>
      <div className="navbar-acc">
        <ConnectedAccount />
        <ConnectedNetwork />
      </div>
    </header>
  )
}
export default Navigation;