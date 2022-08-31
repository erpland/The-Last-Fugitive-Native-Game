import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import Footer from "./components/Footer";
import ProfileModal from "./components/ProfileModal";
import "./styles/home.scss";
import LevelsModal from "./components/LevelsModal";
import ConnectModal from "./components/ConnectModal";
import SettingsModal from "./components/SettingModal";
import { useMusicContext } from "../context/MusicContext";
import { App as app } from "@capacitor/app";
import {
  addUserPlayDate,
} from "../../Database/database";
import { PlayDatesType } from "../../Types/userTypes";
import { useUserContext } from "../context/UserContext";
import { PLAY_DATE_TIMER } from "../../utils/constants";

type Props = {};

const Home: React.FC = (props: Props) => {
  const [isProfileModal, setIsProfileModal] = useState(false);
  const { playMusic,stopMusic } = useMusicContext();
  const { currentUser, isGuest, setCurrentUser } = useUserContext();
  const timer = useRef(setTimeout(() => {}, PLAY_DATE_TIMER));
  let playDate: PlayDatesType | null;
  let currentDate = new Date();

  useEffect(() => {
    clearTimeout(timer.current);
    app.addListener("appStateChange", ({ isActive }) => {
      if (!isActive) {
        stopMusic()
        timer.current = setTimeout(() => {
          setNewPlayDate();
        }, PLAY_DATE_TIMER);
      } else {
        playMusic()
        clearTimeout(timer.current);
        if (playDate) {
          const dates = currentUser.play_dates;
          dates.push(playDate);
          setCurrentUser({
            ...currentUser,
            play_dates: dates,
          });
          addUserPlayDate(currentUser._id, currentUser.token, dates, isGuest);
          playDate = null;
          console.log("Updated!");
        }
        console.log("CLEAR!");
      }
    });
  }, []);

  const setNewPlayDate = () => {
    const end_date = new Date();
    playDate = { start_date: currentDate, end_date };
    currentDate = new Date();
  };

  useEffect(() => {
    playMusic();
  }, []);
  console.count("home")
  return (
    <IonPage>
      <IonContent
        class="ion-padding-start ion-padding-end"
        className="main__content"
      >
        <SettingsModal />
        <ConnectModal />
        <ProfileModal
          isProfileModal={isProfileModal}
          setIsProfileModal={setIsProfileModal}
        />
        <LevelsModal />
        <div className="container">
          <Header setIsProfileModal={(val: any) => setIsProfileModal(val)} />
          <MainTitle />
          <Footer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
