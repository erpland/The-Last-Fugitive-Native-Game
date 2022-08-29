import { IonButton, IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { logoFacebook, wallet, gift, cloudDownload } from "ionicons/icons";
import LoginModal from "./components/LoginModal";
import { useIonRouter } from "@ionic/react";
import "./styles/connect.scss";
import { Preferences } from "@capacitor/preferences";
import { useUserContext } from "../context/UserContext";
import { useLevelContext } from "../context/LevelContext";
import {
  fetchGuestById,
  fetchUserByid,
  getAllAvatars,
  getAllHints,
  getAllLevels,
  registerGuest,
} from "../../Database/database";
import PasswordResetModal from "./components/PasswordResetModal";

type Props = {};

const Connect: React.FC = (props: Props) => {

  // const router = useIonRouter();
  const { isGuest,setIsGuest,setCurrentUser} = useUserContext();
  const router = useIonRouter();
  const {setCurrentLevel} = useLevelContext();
  const [isResetModal, setIsResetModal] = useState(false)
  const playAsGuest=async()=>{
    const guestId = (await Preferences.get({ key: "guestId" })).value;
    if(guestId){
      const loggedGuest = await fetchGuestById(guestId);
          setCurrentUser(loggedGuest);
          setCurrentLevel(loggedGuest.current_level);
          setIsGuest(true)
    }
    else{
      const registeredGuest = await registerGuest();
      setCurrentUser(registeredGuest);
      setCurrentLevel(registeredGuest.current_level);
      setIsGuest(true)
      await Preferences.set({
        key: "guestId",
        value: registeredGuest._id,
      });
    }
    router.push("/home");
  }

  return (
    <IonPage>
      <IonContent className="main__content">
        <LoginModal setIsResetModal={(val:any)=>setIsResetModal(val)}/>
        <PasswordResetModal
        isResetModal = {isResetModal} 
        setIsResetModal={(val:any)=>setIsResetModal(val)}
        />
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
            {/* <IonButton fill="outline">
              <IonIcon slot="start" icon={logoFacebook} />
              Sign In With Facebook
            </IonButton> */}
            <span onClick={()=>playAsGuest()}>Play as Guest</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Connect;
