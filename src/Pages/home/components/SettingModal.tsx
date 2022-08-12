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
import React, { useRef } from "react";

type Props = {};

const SettingsModal: React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);
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
        <IonRange>
          <IonIcon slot="start" icon={volumeMute}></IonIcon>
          <IonIcon slot="end" icon={volumeHigh}></IonIcon>
        </IonRange>
        </div>
        <div className="settings-modal__toggle">
          <span>Notifications</span>
          <IonToggle/>
        </div>
        <div className="settings-modal__buttons">
          <IonButton fill="outline" style={{color:"white"}}>Cancel</IonButton>
          <IonButton color="primary">Save</IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default SettingsModal;
