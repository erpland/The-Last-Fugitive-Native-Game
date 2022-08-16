import React, { createContext, useState } from 'react'
import {LevelContextType, LevelType} from '../../Types/levelTypes'

export const LevelContext = createContext<LevelContextType | null>(null);

const LevelContextProvider:React.FC<React.ReactNode> = ({children}) => {
  const [allLevels, setAllLevels] = useState<LevelType[] | null>(null)
  const [currentLevel,setCurrentLevel] = useState<LevelType | null>(null)

  return (
    <LevelContext.Provider value={{allLevels,currentLevel}}>
      {children}
    </LevelContext.Provider>
  )
}

export default LevelContextProvider