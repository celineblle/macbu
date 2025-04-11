import React from 'react'
import './App.css'
import Cuisine from './components/cuisine/Cuisine'
import BureauManager from './components/bureauManager/BureauManager'
import Comptoir from './components/comptoir/Comptoir'

function App() {
 
  return(

  <div id="page">
    <BureauManager />
    <Cuisine/>
    <Comptoir />
  </div>
  )
}

export default App
