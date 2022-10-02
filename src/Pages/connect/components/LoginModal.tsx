//מודל עוטף לדף הרשמה/דף התחברות בהתאמה
import React, { useRef, useState } from "react";
import { IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import Login from "./Login";
import Register from "./Register";

type Props = {
  setIsResetModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginModal : boolean
  setIsLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  openLoader:()=>void
  closeLoader:()=>void
};

const LoginModal: React.FC<Props> = ({ setIsResetModal,isLoginModal,setIsLoginModal,openLoader,closeLoader }) => {
  const [isLoginComponent, setisLoginComponent] = useState(true);
  const modal = useRef<HTMLIonModalElement>(null);
  

  const closeModal = () => {
    modal.current?.dismiss();
  };
  return (
    <IonModal id="login-modal" ref={modal} 
    isOpen={isLoginModal}
    onDidDismiss={()=>setIsLoginModal(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isLoginComponent ? "Login" : "Register"} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="login-modal__body">
        {isLoginComponent ? (
          <Login
            setisLoginComponent={(val) => setisLoginComponent(val)}
            closeModal={closeModal}
            openLoader={openLoader}
            closeLoader={closeLoader}
            setIsResetModal={setIsResetModal}
            setIsLoginModal={setIsLoginModal}
          />
        ) : (
          <Register
            setisLoginComponent={(val) => setisLoginComponent(val)}
            closeModal={closeModal}
            openLoader={openLoader}
            closeLoader={closeLoader}
          />
        )}
      </div>
    </IonModal>
  );
};

export default LoginModal;
