import './App.css'
import DisplayPanel from './components/DisplayPanel/DisplayPanel'
import Navigation from './components/Navigation/Navigation'
import Wallet from './components/Wallet/Wallet'

function App() {
  return (
    <>
      <Wallet>
        <Navigation/>
        <DisplayPanel/>
      </Wallet>
    </>
  )
}

export default App
