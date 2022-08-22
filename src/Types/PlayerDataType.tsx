export interface PlayerData{
  steps:number
  isPlayerTurn:boolean
}

export interface PlayerDataContextType{
  playerData:PlayerData
  setPlayerData:React.Dispatch<React.SetStateAction<PlayerData>>
} 