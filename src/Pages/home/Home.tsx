import React, { useEffect, useRef, useState } from "react";
import { IonPage,IonContent } from "@ionic/react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import Footer from "./components/Footer";
import ProfileModal from "./components/ProfileModal";
import './styles/home.scss'
import LevelsModal from "./components/LevelsModal";
import ConnectModal from "./components/ConnectModal";
import SettingsModal from "./components/SettingModal";
import FinishModal from "./components/FinishModal";
import { useUserContext } from "../context/UserContext";
import { useLevelContext } from "../context/LevelContext";
import { useMusicContext } from "../context/MusicContext";
type Props = {};

const Home: React.FC = (props: Props) => {
const {playMusic} = useMusicContext()
  useEffect(() => {
    playMusic()
  }, [])



return (
    <IonPage>
      <IonContent
        class="ion-padding-start ion-padding-end"
        className="main__content">

       
        <FinishModal isWon={true} moves={8} score={5} stars={2}/>
        <SettingsModal/>
        <ConnectModal/>
        <ProfileModal/>
        <LevelsModal/>
       
        <div className="container">
          <Header/>
          <MainTitle />
          <Footer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
