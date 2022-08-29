import { IonButton, IonContent, IonPage, useIonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { logoFacebook, wallet, gift, cloudDownload } from "ionicons/icons";
import LoginModal from "./components/LoginModal";
import { useIonRouter } from "@ionic/react";
import "./styles/connect.scss";
import { Preferences } from "@capacitor/preferences";
import { useUserContext } from "../context/UserContext";
import { useLevelContext } from "../context/LevelContext";
import { fetchGuestById, registerGuest } from "../../Database/database";
import PasswordResetModal from "./components/PasswordResetModal";

type Props = {};

const Connect: React.FC = (props: Props) => {
  const { setIsGuest, setCurrentUser,setIsRegisteredUser } = useUserContext();
  const router = useIonRouter();
  const { setCurrentLevel } = useLevelContext();
  const [isResetModal, setIsResetModal] = useState(false);
  const [isLoginModal,setIsLoginModal] = useState(false)
  const [present, dismiss] = useIonLoading();

  const playAsGuest = async () => {
    present({message: "Logging In...",})
    const guestId = (await Preferences.get({ key: "guestId" })).value;
    let guestUser;
    if (guestId) {
      guestUser = await fetchGuestById(guestId);
    } else {
      guestUser = await registerGuest();
      await Preferences.set({
        key: "guestId",
        value: guestUser._id,
      });
    }
    setCurrentUser(guestUser);
    setCurrentLevel(guestUser.current_level);
    setIsGuest(true);
    setIsRegisteredUser(false)
    dismiss()
    router.push("/home");
  };

  return (
    <IonPage>
      <IonContent className="main__content">
        <LoginModal 
        setIsResetModal={(val: any) => setIsResetModal(val)}
        isLoginModal = {isLoginModal} 
        setIsLoginModal={(val:any)=>setIsLoginModal(val)}
        openLoader={present}
        closeLoader={dismiss}
        />
        <PasswordResetModal
          isResetModal={isResetModal}
          setIsResetModal={(val: any) => setIsResetModal(val)}
        />
        <div className="connect-container">
          <div className="connect__headlines">
            <h1>Log in To Get Benfits</h1>
            <h5>Connect With Email</h5>
          </div>
          <div className="connect__images">
            <div>
              <IonIcon icon={wallet} />
              <small>Watch Less Ads</small>
            </div>
            <div>
              <IonIcon icon={gift} />
              <small>Get Exclusive Content</small>
            </div>
            <div>
              <IonIcon icon={cloudDownload} />
              <small>Save Your Prograss</small>
            </div>
          </div>
          <div className="connect__buttons">
            <IonButton onClick={()=>setIsLoginModal(true)}>Sign In With Email</IonButton>
            {/* <IonButton fill="outline">
              <IonIcon slot="start" icon={logoFacebook} />
              Sign In With Facebook
            </IonButton> */}
            <span onClick={() => playAsGuest()}>Play as Guest</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Connect;
