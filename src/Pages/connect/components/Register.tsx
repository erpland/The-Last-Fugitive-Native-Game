import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import React, { SetStateAction, useState } from "react";

type Props = {
  setisLoginComponent: React.Dispatch<SetStateAction<boolean>>;
};

const Register: React.FC<Props> = (props) => {
  const [gender, setGender] = useState(1)
  return (
    <form className="register-container">
      <div className="regiseter__left">
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
            placeholder="Nickname"
            autocomplete="name"
            inputMode="text"
            type="text"
          ></IonInput>
        </IonItem>
      </div>
      <div className="register__right">
        <IonItem lines={"none"}>
          <IonInput
            color={"white"}
            placeholder="Password"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
        <IonItem lines={"none"}>
          <IonInput
            color={"white"}
            placeholder="Password Confirm"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
      </div>

      <div className="register-container__gender">
          <IonRadioGroup value={1} style={{display:"contents"}}>
            <IonItem>
              <IonLabel>Male</IonLabel>
              <IonRadio slot="start" color="light" value={1}>
              </IonRadio>
            </IonItem>

            <IonItem>
              <IonLabel>Female</IonLabel>
              <IonRadio slot="start" color="light" value={2}></IonRadio>
            </IonItem>
          </IonRadioGroup>
      </div>
      <div className="register-container__buttons">
        <IonButton strong={true} color="primary">
          Signup
        </IonButton>
        <p onClick={() => props.setisLoginComponent(true)}>
          Already Have an Account?
        </p>
      </div>
    </form>
  );
};

export default Register;
