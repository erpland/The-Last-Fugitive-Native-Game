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

const ConnectModal: React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal id="connect-modal" ref={modal} trigger="open-connect-modal">
      <IonHeader>
        <IonToolbar>
          {/* <IonTitle>Connect</IonTitle> */}
          <span>Connect</span>
        </IonToolbar>
      </IonHeader>

      <div className="connect-modal__body">
        <form>
          <IonItem lines={"none"}>
            <IonInput
              color={"white"}
              placeholder="Email"
              autocomplete="email"
              inputMode="email"
              type="email"
            ></IonInput>
          </IonItem>
          <IonItem lines={"none"}>
            <IonInput
              color={"white"}
              placeholder="Password"
              autocomplete="new-password"
              type="password"
            ></IonInput>
          </IonItem>
          <IonButton color="primary">Signup</IonButton>
        </form>

        <div className="connect-modal__divider">
            <span className="hr"/>
            <span>OR</span>
            <span className="hr"/>
        </div>
        <div className="connect-modal__icons">
            <IonIcon icon={logoFacebook}/>
            <IonIcon icon={logoGoogle}/>
        </div>
      </div>
    </IonModal>
  );
};

export default ConnectModal;
