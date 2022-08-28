import React, { createContext, useContext, useEffect, useState } from 'react'
// import {HintsTypes, MusicContextType, LevelType} from '../../Types/levelTypes'

export const MusicContext = createContext<any>(null);

const MusicContextProvider:React.FC<React.ReactNode> = ({children}) => {
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement>(new Audio(
    '/assets/music/music1.mp3'
  ))
  const [musicVolume, setMusicVolume] = useState(1)
  
  useEffect(() => {
    backgroundMusic.volume = musicVolume
  }, [musicVolume])
  
  const playMusic = async() =>{
    if(backgroundMusic.paused)
      backgroundMusic.load()
      await backgroundMusic.play()
      backgroundMusic.volume = musicVolume
  }
  const stopMusic = async()=>{
    console.log("stoping")
    await backgroundMusic.pause()
  }
  backgroundMusic.addEventListener('ended',(ev)=>{
    console.log("ended")
    stopMusic()
    playMusic()
  })
  
  return (
    <MusicContext.Provider value={{playMusic,stopMusic,setMusicVolume}}>
      {children}
    </MusicContext.Provider>
  )
}

export default MusicContextProvider
export const useMusicContext = () => useContext(MusicContext)