import React, { useState } from "react";
import { IonPage,IonContent } from "@ionic/react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import Footer from "./components/Footer";
import ProfileModal from "./components/ProfileModal";
import './styles/home.scss'
import LevelsModal from "./components/LevelsModal";
type Props = {};

const Home: React.FC = (props: Props) => {
  return (
    <IonPage>
      <IonContent
        class="ion-padding-start ion-padding-end"
        className="main__content"
      >
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
