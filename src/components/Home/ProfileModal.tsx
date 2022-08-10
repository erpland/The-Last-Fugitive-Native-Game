
import {
  IonButton,
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useRef } from "react";

type Props = {};

const ProfileModal = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }
  return (
    <IonModal id="profile-modal" ref={modal} trigger="open-profile-modal">
      <IonContent>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton color="light" onClick={() => dismiss()}>
              X
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonModal>
  );
};

export default ProfileModal;
