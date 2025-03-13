import React from 'react'
import './App.css'
import Cuisine from './components/cuisine/Cuisine'
import BureauManager from './components/bureauManager/BureauManager'
import Comptoir from './components/comptoir/Comptoir'

function App(): JSX.Element {
 
  return(

  <div id="page">
    <div id="bureauManager">
    <BureauManager />
    </div>
    <div id="cuisine">
    <Cuisine/>
    </div>
    <div id="comptoir">
    <Comptoir />
    </div>
  </div>
  )
}

export default App
