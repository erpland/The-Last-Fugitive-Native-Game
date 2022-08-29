import React, { useEffect, useState } from "react";
import { IonPage,IonContent } from "@ionic/react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import Footer from "./components/Footer";
import ProfileModal from "./components/ProfileModal";
import './styles/home.scss'
import LevelsModal from "./components/LevelsModal";
import ConnectModal from "./components/ConnectModal";
import SettingsModal from "./components/SettingModal";
import { useMusicContext } from "../context/MusicContext";

type Props = {};

const Home: React.FC = (props: Props) => {
  const [isProfileModal, setIsProfileModal] = useState(false)
const {playMusic} = useMusicContext()
  useEffect(() => {
    playMusic()
  }, [])


return (
    <IonPage>
      <IonContent
        class="ion-padding-start ion-padding-end"
        className="main__content">
        <SettingsModal/>
        <ConnectModal/>
        <ProfileModal
        isProfileModal = {isProfileModal}
        setIsProfileModal = {setIsProfileModal}/>
        <LevelsModal/>
       
        <div className="container">
          <Header setIsProfileModal={(val:any)=>setIsProfileModal(val)}/>
          <MainTitle />
          <Footer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
