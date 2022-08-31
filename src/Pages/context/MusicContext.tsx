import { Preferences } from "@capacitor/preferences";
import React, { createContext, useContext, useEffect, useState } from "react";
// import {HintsTypes, MusicContextType, LevelType} from '../../Types/levelTypes'

export const MusicContext = createContext<any>(null);

const MusicContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement>(
    new Audio("/assets/music/music1.mp3")
  );

  const [soundVolume, setSoundVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0);

  useEffect(() => {
    const getVolume = async () => {
      const music = (await Preferences.get({ key: "music" })).value;
      const sound = (await Preferences.get({ key: "sound" })).value;
      setSoundVolume(Number(sound));
      setMusicVolume(Number(music));
      playMusic(Number(music))
    };
    getVolume();
  }, []);

  useEffect(() => {
    backgroundMusic.volume = musicVolume;
  }, [musicVolume]);

  const playMusic = async (volume = musicVolume) => {
    if (backgroundMusic.paused) 
    backgroundMusic.load();
    await backgroundMusic.play();
    backgroundMusic.volume = volume;
    console.log("music playing");
  };
  const stopMusic = async () => {
    console.log("music stoped");
    backgroundMusic.pause();
  };

  backgroundMusic.addEventListener("ended",  (ev) => {
    stopMusic();
    playMusic();
  });

  return (
    <MusicContext.Provider
      value={{
        playMusic,
        stopMusic,
        musicVolume,
        setMusicVolume,
        soundVolume,
        setSoundVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
export const useMusicContext = () => useContext(MusicContext);
