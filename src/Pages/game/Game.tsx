import React from 'react'

type Match = {match:any}

const Game: React.FC<Match> = ({match}) => {
  console.log(match.params)
  return (
    <div>Game - {match.params.level}</div>
  )
}

export default Game