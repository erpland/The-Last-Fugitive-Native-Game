import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { UserSignupType, UserContextType } from "../../../Types/userTypes";
import React, { SetStateAction, useState, useContext } from "react";
import { registerUser } from "../../../Database/database";
import { UserContext } from "../../context/UserContext";
import { useIonRouter } from "@ionic/react";
type Props = {
  setisLoginComponent: React.Dispatch<SetStateAction<boolean>>;
  modal:any
};

const Register: React.FC<Props> = (props) => {
  const router = useIonRouter();
  const [gender, setGender] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<UserSignupType>({
    nickname: "",
    email: "",
    password: "",
    avatarCode: 0,
    avatarUrl: "/assets/avatars/male1.png",
    gender: 1,
  });
  const { setCurrentUser } = useContext(
    UserContext
  ) as UserContextType;
  const validateEmail = (e: any) => {
    let email = e.target.value;
    setUser({ ...user, email });
  };
  const validateNickName = (e: any) => {
    let nickname = e.target.value;

    setUser({ ...user, nickname });
  };
  const validatePassword = (e: any) => {
    let password = e.target.value;

    setUser({ ...user, password });
  };
  const confirmPass = (e: any) => {
    let confirmPass = e.target.value;

    setConfirmPassword(confirmPass);
  };
  const validateGender = (e: any) => {
    let gender = e.target.value;
    let avatarUrl =
      gender === 1
        ? "/assets/avatars/male1.png"
        : "/assets/avatars/female1.png";

    setUser({ ...user, gender, avatarUrl });
  };
  const signUp = async (e: any) => {
    e.preventDefault();
 
    if(user.password!==confirmPassword){
      console.log("passwords dont match!")
      return
    }
    if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(user.password))){
      console.log("passwords dont validate!")
      return
    }
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))){
      console.log("email dont validate!")
      return
    }
    if(user.nickname.length>15){
      console.log("nickname length is more than 15 chars!")
      return
    }
    
    const registerdUser = await registerUser(user);
    console.log("register user", registerdUser);
    if (registerdUser) {
      await setCurrentUser(registerdUser);
      router.push("/home");
      props.modal.current?.dismiss();
    }
    
  };
  return (
    <form onSubmit={signUp} className="register-container">
      <div className="regiseter__left">
        <IonItem lines={"none"}>
          <IonInput
          required
            onIonChange={validateEmail}
            color={"white"}
            placeholder="Email"
            autocomplete="email"
            inputMode="email"
            type="email"
          ></IonInput>
        </IonItem>
        <IonItem lines={"none"}>
          <IonInput
          required
            color={"white"}
            onIonChange={validateNickName}
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
          required
            onIonChange={validatePassword}
            color={"white"}
            placeholder="Password"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
        <IonItem lines={"none"}>
          <IonInput
          required
            onIonChange={confirmPass}
            color={"white"}
            placeholder="Password Confirm"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
      </div>

      <div className="register-container__gender">
        <IonRadioGroup
          onIonChange={validateGender}
          value={user.gender}
          style={{ display: "contents" }}
        >
          <IonItem>
            <IonLabel>Male</IonLabel>
            <IonRadio slot="start" color="light" value={1}></IonRadio>
          </IonItem>

          <IonItem>
            <IonLabel>Female</IonLabel>
            <IonRadio slot="start" color="light" value={2}></IonRadio>
          </IonItem>
        </IonRadioGroup>
      </div>
      <div className="register-container__buttons">
        <IonButton strong={true} color="primary" type="submit">
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
