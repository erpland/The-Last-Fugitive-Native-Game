import {
  IonButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {logoFacebook,logoGoogle} from "ionicons/icons";
import React, { useRef } from "react";

type Props = {};

const SettingsModal: React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal id="settings-modal" ref={modal} trigger="open-settings-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="settings-modal__body">
        </div>
    </IonModal>
  );
};

export default SettingsModal;
