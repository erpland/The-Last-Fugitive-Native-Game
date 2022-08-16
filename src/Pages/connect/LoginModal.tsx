import React, { useRef, useState } from "react";
import { IonHeader, IonModal, IonToolbar } from "@ionic/react";
import Login from "./components/Login";
import Register from "./components/Register";

type Props = {};

const LoginModal: React.FC = (props: Props) => {
  const [isLoginComponent, setisLoginComponent] = useState(true);
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal id="login-modal" ref={modal} trigger="open-login-modal">
      <IonHeader>
        <IonToolbar>
          <span>{isLoginComponent ? "Login" : "Register"} </span>
        </IonToolbar>
      </IonHeader>

      <div className="login-modal__body">
        {isLoginComponent ? (
          <Login setisLoginComponent={(val)=>setisLoginComponent(val)} />
        ) : (
          <Register setisLoginComponent={(val)=>setisLoginComponent(val)} />
        )}
      </div>
    </IonModal>
  );
};

export default LoginModal;
