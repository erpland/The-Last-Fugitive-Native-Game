import { IonButton, IonInput, IonItem } from "@ionic/react";
import React, { SetStateAction } from "react";

type Props = {
  setisLoginComponent:React.Dispatch<SetStateAction<boolean>>
};

const Login: React.FC<Props> = (props) => {
  return (
    <form className="login-container">
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
      <div className="login-container__buttons">
      <IonButton strong={true} color="primary">Login</IonButton>
      <p onClick={()=>props.setisLoginComponent(false)}>Dont Have an Account?</p>
      </div>
    </form>
  );
};

export default Login;
