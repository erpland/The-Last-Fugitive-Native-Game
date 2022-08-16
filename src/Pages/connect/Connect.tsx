import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import { IonIcon } from "@ionic/react";
import { logoFacebook, wallet, gift, cloudDownload } from "ionicons/icons";
import LoginModal from "./LoginModal";
import "./styles/connect.scss";

type Props = {};

const Connect: React.FC = (props: Props) => {
  return (
    <IonPage>
      <IonContent>
        <LoginModal />

        <div className="connect-container">
          <div className="connect__headlines">
            <h1>Log in To Get Benfits</h1>
            <h5>Connect with Facebook Or Email</h5>
          </div>
          <div className="connect__images">
            <div>
              <IonIcon icon={wallet} />
              <small>Get Free Bonues</small>
            </div>
            <div>
              <IonIcon icon={gift} />
              <small>Get Exclusive Gifts</small>
            </div>
            <div>
              <IonIcon icon={cloudDownload} />
              <small>Save Your Prograss</small>
            </div>
          </div>
          <div className="connect__buttons">
            <IonButton id="open-login-modal">Sign In With Email</IonButton>
            <IonButton fill="outline">
              <IonIcon slot="start" icon={logoFacebook} />
              Sign In With Facebook
            </IonButton>
            <span>Play as Guest</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Connect;
