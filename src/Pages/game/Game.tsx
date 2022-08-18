import React from 'react'
import Map from './components/Map'

// type Match = {match:any}

const Game: React.FC = () => {
  // console.log(match.params)
  return (
    <div style={{color:'white'}}>
      <Map/>
    </div>
    // <div>Game - {match.params.level}

    // </div>
  )
}

export default Game