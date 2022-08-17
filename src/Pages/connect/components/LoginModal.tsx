import React, { useRef, useState } from "react";
import { IonHeader, IonModal, IonToolbar, useIonLoading } from "@ionic/react";
import Login from "./Login";
import Register from "./Register";

type Props = {};

const LoginModal: React.FC = (props: Props) => {
  const [isLoginComponent, setisLoginComponent] = useState(true);
  const modal = useRef<HTMLIonModalElement>(null);
  const [present, dismiss] = useIonLoading();

  const closeModal = ()=>{
    modal.current?.dismiss()
  }
  return (
    <IonModal id="login-modal" ref={modal} trigger="open-login-modal">
      <IonHeader>
        <IonToolbar>
          <span>{isLoginComponent ? "Login" : "Register"} </span>
        </IonToolbar>
      </IonHeader>

      <div className="login-modal__body">
        {isLoginComponent ? (
          <Login setisLoginComponent={(val)=>setisLoginComponent(val)} closeModal={closeModal} openLoader={present} closeLoader={dismiss}/>
        ) : (
          <Register setisLoginComponent={(val)=>setisLoginComponent(val)} closeModal={closeModal} openLoader={present} closeLoader={dismiss} />
        )}
      </div>
    </IonModal>
  );
};

export default LoginModal;