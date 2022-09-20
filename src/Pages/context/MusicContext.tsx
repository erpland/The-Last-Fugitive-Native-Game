import { Preferences } from "@capacitor/preferences";
import React, { createContext, useContext, useEffect, useState } from "react";

export const MusicContext = createContext<any>(null);

const MusicContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [soundVolume, setSoundVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0);
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement>(
    new Audio("/assets/music/music1.mp3")
  );
  const [wrongTileSound, setWrongTileSound] = useState<HTMLAudioElement>(
    new Audio("/assets/sounds/wrong_tile.wav")
  );

  useEffect(() => {
    const getVolume = async () => {
      const music = (await Preferences.get({ key: "music" })).value;
      const sound = (await Preferences.get({ key: "sound" })).value;
      setSoundVolume(Number(sound));
      setMusicVolume(Number(music));
      playMusic(Number(music));
    };
    getVolume();
  }, []);

  useEffect(() => {
    backgroundMusic.volume = musicVolume;
  }, [musicVolume]);

  useEffect(() => {
    wrongTileSound.volume = soundVolume;
  }, [soundVolume]);

  const playMusic = async (volume = musicVolume) => {
    if (backgroundMusic.paused) {
      backgroundMusic.load();
    }
    backgroundMusic.volume = volume;
    await backgroundMusic.play();
  };
  const stopMusic = async () => {
    console.log("music stoped");
    backgroundMusic.pause();
  };

  backgroundMusic.addEventListener("ended", (ev) => {
    stopMusic();
    playMusic();
  });
  wrongTileSound.addEventListener("load", (ev) => {
    wrongTileSound.volume = soundVolume;
  });
  const playWrongTile = async (volume = soundVolume) => {
    wrongTileSound.load();
    await wrongTileSound.play();
  };

  return (
    <MusicContext.Provider
      value={{
        playMusic,
        stopMusic,
        musicVolume,
        setMusicVolume,
        soundVolume,
        setSoundVolume,
        playWrongTile,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
export const useMusicContext = () => useContext(MusicContext);
