import { Preferences } from "@capacitor/preferences";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NativeAudio } from "@awesome-cordova-plugins/native-audio";
export const MusicContext = createContext<any>(null);

const MusicContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [soundVolume, setSoundVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0);
  // const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement>(
  //   new Audio("/assets/music/music1.mp3")
  // );
  const [wrongTileSound, setWrongTileSound] = useState<HTMLAudioElement>(
    new Audio("/assets/sounds/wrong_tile.wav")
  );

  useEffect(() => {
    const getVolume = async () => {
      const music = (await Preferences.get({ key: "music" })).value;
      const sound = (await Preferences.get({ key: "sound" })).value;
      setSoundVolume(Number(sound));
      setMusicVolume(Number(music));
      await NativeAudio.preloadComplex("music", "assets/music/music1.mp3", Number(music), 1, 0);
      await NativeAudio.loop("music");
      // playMusic(Number(music));
    };
    getVolume();
  }, []);

  useEffect(() => {
    // backgroundMusic.volume = musicVolume;
    NativeAudio.setVolumeForComplexAsset("music", musicVolume);
  }, [musicVolume]);

  useEffect(() => {
    wrongTileSound.volume = soundVolume;
  }, [soundVolume]);

  const playMusic = async (volume = musicVolume) => {
    // if (backgroundMusic.paused) {
    //   backgroundMusic.load();
    // }
    // backgroundMusic.volume = volume;
    // await backgroundMusic.play();
    await NativeAudio.play('music')
  };

  const stopMusic = async () => {
    await NativeAudio.stop('music')
    // backgroundMusic.pause();
  };

  // backgroundMusic.addEventListener("ended", (ev) => {
  //   playMusic();
  // });
  // backgroundMusic.addEventListener("load", (ev) => {
  //   backgroundMusic.volume = musicVolume;
  // });
  wrongTileSound.addEventListener("load", (ev) => {
    wrongTileSound.volume = soundVolume;
  });
  const playWrongTile = async () => {
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
