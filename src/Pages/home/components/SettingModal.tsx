import { Preferences } from "@capacitor/preferences";
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
  const { currentUser, setCurrentUser, isGuest } = useUserContext();
  const { musicVolume, setMusicVolume, soundVolume, setSoundVolume } =
    useMusicContext();
  // const [first, setfirst] = useState(second)
  const [isChecked, setIsChecked] = useState(currentUser.is_notification);
  const saveUserSettings = async () => {
    if (currentUser.is_notification !== isChecked) {
       updateUserNotification(
        currentUser._id,
        currentUser.token,
        isChecked,
        isGuest
      );
      setCurrentUser({ ...currentUser, is_notification: isChecked });
    }
    modal.current?.dismiss();
  };
  const updateUserVolume = async () => {
    await Preferences.set({ key: "music", value: String(musicVolume) });
    await Preferences.set({ key: "sound", value: String(soundVolume) });
  };
  console.log(musicVolume,soundVolume)
  return (
    <IonModal
      id="settings-modal"
      ref={modal}
      trigger="open-settings-modal"
      onDidDismiss={updateUserVolume}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="settings-modal__body">
        <div className="settings-modal__range">
          <span>Sounds</span>
          <IonRange
            min={0}
            max={1}
            step={0.1}
            value={soundVolume}
            debounce={100}
            onIonChange={({ detail }) => {
              console.log(detail.value);
              setSoundVolume(detail.value);
            }}
          >
            <IonIcon slot="start" icon={volumeMute}></IonIcon>
            <IonIcon slot="end" icon={volumeHigh}></IonIcon>
          </IonRange>
        </div>
        <div className="settings-modal__range">
          <span>Music</span>
          <IonRange
            min={0}
            max={1}
            step={0.1}
            value={musicVolume}
            debounce={100}
            onIonChange={({ detail }) => {
              console.log(detail.value);
              setMusicVolume(detail.value);
            }}
          >
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
          <IonButton
            fill="outline"
            style={{ color: "white" }}
            onClick={() => modal.current?.dismiss()}
          >
            Cancel
          </IonButton>
          <IonButton color="primary" onClick={() => saveUserSettings()}>
            Save
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default SettingsModal;
