import {
  IonButton,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useRef } from "react";

type Props = {};

const ProfileModal :React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);

  // function dismiss() {
  //   modal.current?.dismiss();
  // }
  return (
    <IonModal id="profile-modal" ref={modal} trigger="open-profile-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="profile-modal__body">
        <div className="image__wrapper">

        <img src="assets/avatars/ZOMBIE_FA_5.png" alt="avatar" />
        </div>
        <IonItem lines={"none"}>
          <IonInput
          
            color={"white"}
            placeholder="Nickname"
            value={"someone"}
          ></IonInput>
        </IonItem>
        <div>
          <IonButton fill="outline" style={{color:"white"}}>Cancel</IonButton>
          <IonButton color="primary">Save</IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ProfileModal;
