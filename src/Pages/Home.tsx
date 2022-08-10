import React, { useState } from "react";
import { IonPage,IonContent } from "@ionic/react";
import Header from "../components/Home/Header";
import MainTitle from "../components/Home/MainTitle";
import Footer from "../components/Home/Footer";
import ProfileModal from "../components/Home/ProfileModal";

type Props = {};

const Home: React.FC = (props: Props) => {
  const [profileModal, setProfileModal] = useState(false)
  return (
    <IonPage>
      <IonContent
        class="ion-padding-start ion-padding-end"
        className="main__content"
      >
        <ProfileModal/>
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
