import {
  IonButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonRange,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { volumeMute, volumeHigh } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { updateUserNotification } from "../../../Database/database";
import { useMusicContext } from "../../context/MusicContext";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const SettingsModal: React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { currentUser,setCurrentUser } = useUserContext();
  const {setMusicVolume} = useMusicContext()

  const [isChecked, setIsChecked] = useState(currentUser.is_notification);

  const saveUserSettings = async () => {
    if (currentUser.is_notification !== isChecked) {
      await updateUserNotification(currentUser._id, currentUser.token,isChecked);
      setCurrentUser({...currentUser,is_notification:isChecked})
    }
    modal.current?.dismiss()
  };
  return (
    <IonModal id="settings-modal" ref={modal} trigger="open-settings-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="settings-modal__body">
        <div className="settings-modal__range">
          <span>Sounds</span>
          <IonRange>
            <IonIcon slot="start" icon={volumeMute}></IonIcon>
            <IonIcon slot="end" icon={volumeHigh}></IonIcon>
          </IonRange>
        </div>
        <div className="settings-modal__range">
          <span>Music</span>
          <IonRange min={0} max= {1} step={0.1} defaultValue={1} debounce={100} onIonChange={({detail})=>{
            console.log(detail.value)
            setMusicVolume(detail.value)}}>
            <IonIcon slot="start" icon={volumeMute}></IonIcon>
            <IonIcon slot="end" icon={volumeHigh}></IonIcon>
          </IonRange>
        </div>
        <div className="settings-modal__toggle">
          <span>Notifications</span>
          <IonToggle
            checked={isChecked}
            onIonChange={() => setIsChecked(!isChecked)}
          />
        </div>
        <div className="settings-modal__buttons">
          <IonButton fill="outline" style={{ color: "white" }}
          onClick={()=>modal.current?.dismiss()}>
            Cancel
          </IonButton>
          <IonButton color="primary"
          onClick={()=>saveUserSettings()}>Save</IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default SettingsModal;
