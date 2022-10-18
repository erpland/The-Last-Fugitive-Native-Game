import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import Footer from "./components/Footer";
import ProfileModal from "./components/ProfileModal";
import "./styles/home.scss";
import LevelsModal from "./components/LevelsModal";
import SettingsModal from "./components/SettingModal";
import { useMusicContext } from "../context/MusicContext";
import { App, App as app } from "@capacitor/app";
import { addUserPlayDate } from "../../Database/database";
import { PlayDatesType } from "../../Types/userTypes";
import { useUserContext } from "../context/UserContext";
import { PLAY_DATE_TIMER } from "../../utils/Constants";
import { Preferences } from "@capacitor/preferences";
import Tutorial from "./components/Tutorial";

type Props = {};

const Home: React.FC = (props: Props) => {
  const [isProfileModal, setIsProfileModal] = useState(false);
  const { playMusic, stopMusic } = useMusicContext();
  const {
    currentUser,
    isRegisteredUser,
    isGuest,
    setCurrentUser,
    setRemainingGames,
    remainingGames,
    lifesObject,
  } = useUserContext();
  const timer = useRef(setTimeout(() => {}, PLAY_DATE_TIMER));
  let playDate: PlayDatesType | null;
  let currentDate = new Date();

  const router = useIonRouter();

  useEffect(() => {
    App.addListener("backButton", async ({ canGoBack }) => {
      if (canGoBack) {
        console.log("I AM HERE!");
        switch (router.routeInfo.pathname) {
          case "/home":
            console.log("HOME");
            await LogoutHandler();
            break;
          case "/game":
            console.log("GAME BACK");
            router.goBack();
            break;
          case "/connect":
            await App.exitApp();
            break;
          default:
            console.log("DEFAULT");
            break;
        }
      } else {
        await App.exitApp();
      }
    });
    const setGameLeft = async () => {
      if (!remainingGames) {
        let games;
        if (isGuest) {
          games = { current: lifesObject.guest, max: lifesObject.guest };
        } else {
          games = { current: lifesObject.user, max: lifesObject.user };
        }
        setRemainingGames(games);
        await Preferences.set({ key: "games", value: String(games.current) });
      }
    };
    setGameLeft();
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    app.addListener("appStateChange", ({ isActive }) => {
      if (!isActive) {
        stopMusic();
        console.log("Timer Start", new Date());
        timer.current = setTimeout(() => {
          console.log("new date added", new Date());
          setNewPlayDate();
        }, PLAY_DATE_TIMER);
      } else {
        playMusic();
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
          console.log("play date has been updated");
        }
      }
    });
  }, []);

  const setNewPlayDate = () => {
    const end_date = new Date();
    playDate = { start_date: currentDate, end_date };
    currentDate = new Date();
  };
  const LogoutHandler = async () => {
    if (isRegisteredUser) {
      await Preferences.remove({ key: "isLoggedIn" });
    }
    router.push("/connect");
  };

  return (
    <IonPage>
      <IonContent class="ion-padding-start ion-padding-end" className="main__content">
        <SettingsModal />

        <ProfileModal isProfileModal={isProfileModal} setIsProfileModal={setIsProfileModal} />
        <LevelsModal />
        <Tutorial />
        <div className="container">
          <Header setIsProfileModal={(val: any) => setIsProfileModal(val)} />
          <MainTitle connectButtonHandler={LogoutHandler} />
          <Footer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
