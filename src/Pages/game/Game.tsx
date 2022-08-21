import React from 'react'
import Header from './components/Header'
import Map from './components/Map'
import TurnSystem from './components/TurnSystem'
import './styles/global.scss'
import {tempLevel} from './temp.js'


// type Match = {match:any}

const Game: React.FC = () => {
  const {map,player,enemies} = tempLevel
  return (
    <div style={{color:'white'}}>
      <Header/>
      <div className='game-map__container'>
      <Map map={map}/>
      <TurnSystem player={player} enemies = {enemies}/>
      </div>
    </div>
    // <div>Game - {match.params.level}

    // </div>
  )
}

export default Game