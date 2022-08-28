import React, { createContext, useContext, useState } from 'react'
import {HintsTypes, LevelContextType, LevelType} from '../../Types/levelTypes'
import { useUserContext } from './UserContext';

export const LevelContext = createContext<LevelContextType | null>(null);

const LevelContextProvider:React.FC<React.ReactNode> = ({children}) => {
  const {currentUser} = useUserContext()
  const [allLevels, setAllLevels] = useState<LevelType[] | []>([])
  const [currentLevel,setCurrentLevel] = useState<LevelType | {}>({})
  console.log(currentLevel)
  const [hints, setHints] = useState<HintsTypes[]>([])
  return (
    <LevelContext.Provider value={{allLevels, setAllLevels, currentLevel,setCurrentLevel,hints,setHints}}>
      {children}
    </LevelContext.Provider>
  )
}

export default LevelContextProvider
export const useLevelContext = () => useContext(LevelContext) as LevelContextType