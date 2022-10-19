import { Preferences } from "@capacitor/preferences";
import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from "react";
import { NativeAudio } from "@awesome-cordova-plugins/native-audio";
import { Device } from "@capacitor/device";
export const MusicContext = createContext<any>(null);

const MusicContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [soundVolume, setSoundVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0);

  const platform = useRef<"ios" | "android" | "web">();
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement>(
    new Audio("/assets/music/music1.mp3")
  );
  const [wrongTileSound, setWrongTileSound] = useState<HTMLAudioElement>(
    new Audio("/assets/sounds/wrong_tile.wav")
  );

  useEffect(() => {
    const getDevicePlatform = async () => {
      const info = await Device.getInfo();
      platform.current = info.platform;
    };
    const getVolume = async () => {
      const music = (await Preferences.get({ key: "music" })).value;
      const sound = (await Preferences.get({ key: "sound" })).value;
      setSoundVolume(Number(sound));
      setMusicVolume(Number(music));
      if (platform.current === "android" || platform.current === "ios") {
        await NativeAudio.preloadComplex("music", "assets/music/music1.mp3", Number(music), 1, 0);
        await NativeAudio.loop("music");
      } else {
        playMusic(Number(music));
      }
    };
    getDevicePlatform();
    getVolume();
  }, []);

  useEffect(() => {
    backgroundMusic.volume = musicVolume;
    NativeAudio.setVolumeForComplexAsset("music", musicVolume);
  }, [musicVolume]);

  useEffect(() => {
    wrongTileSound.volume = soundVolume;
  }, [soundVolume]);

  const playMusic = async (volume = musicVolume) => {
    if (platform.current === "android" || platform.current === "ios") {
      await NativeAudio.play("music");
    } else {
      if (backgroundMusic.paused) {
        backgroundMusic.load();
      }
      backgroundMusic.volume = volume;
      await backgroundMusic.play();
    }
  };

  const stopMusic = async () => {
    if (platform.current === "android" || platform.current === "ios") {
      await NativeAudio.stop("music");
    } else {
      backgroundMusic.pause();
    }
  };

  backgroundMusic.addEventListener("ended", (ev) => {
    playMusic();
  });
  backgroundMusic.addEventListener("load", (ev) => {
    backgroundMusic.volume = musicVolume;
  });

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
