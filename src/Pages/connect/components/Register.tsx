import {
  IonAlert,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  useIonToast,
} from "@ionic/react";
import { UserSignupType } from "../../../Types/userTypes";
import React, { SetStateAction, useState } from "react";
import { registerUser, signGuestAsUser } from "../../../Database/database";
import { useUserContext } from "../../context/UserContext";
import { useIonRouter } from "@ionic/react";
import { useLevelContext } from "../../context/LevelContext";
import { Preferences } from "@capacitor/preferences";
import { TOAST_DURATION } from "../../../utils/Constants";
type Props = {
  setisLoginComponent: React.Dispatch<SetStateAction<boolean>>;
  openLoader: ({}) => void;
  closeLoader: () => void;
  closeModal: () => void;
};

const Register: React.FC<Props> = (props) => {
  const router = useIonRouter();
  const [present, dismiss] = useIonToast();
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    header: "Error...",
    subHeader: "",
    message:
      "We had some trouble registering you.\n Please check your internet connection and try again.",
    buttons: ["OK"],
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<UserSignupType>({
    nickname: "",
    email: "",
    password: "",
    avatarCode: 0,
    avatarUrl: "/assets/avatars/male1.png",
    gender: 1,
  });
  const { setCurrentUser, setIsRegisteredUser } = useUserContext();
  const { setCurrentLevel } = useLevelContext();

  const genderHandler = (gender: number) => {
    let avatarUrl =
      gender === 1
        ? "/assets/avatars/male1.png"
        : "/assets/avatars/female1.png";

    setUser({ ...user, gender, avatarUrl });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.nickname || !user.email || !user.password || !confirmPassword) {
      present({
        duration: TOAST_DURATION,
        message: "All Fields Are Requierd!",
      });
      return;
    }
    if (user.password !== confirmPassword) {
      present({
        duration: TOAST_DURATION,
        message: "Password Does Not Match!",
      });
      return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(user.password)) {
      present({
        duration: TOAST_DURATION,
        message:
          "Password Must Be Atleast 6 characters with capital letter lower case letter and a number",
      });
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      present({ duration: TOAST_DURATION, message: "Wrong email format" });
      return;
    }
    if (user.nickname.length > 15) {
      present({
        duration: TOAST_DURATION,
        message: "Nickname cannot be more then 15 characters",
      });
      return;
    }
    props.openLoader({
      message: "Loggin In...",
    });
    let registeredUser
    try{
      let guestId=(await Preferences.get({key:"guestId"})).value
      if(!guestId){
      registeredUser = await registerUser(user);
      }
      else{
        registeredUser = await signGuestAsUser({...user,id: guestId});
         await Preferences.remove({key:"guestId"})
      }
    }catch{
      setShowAlert({ ...showAlert, isOpen: true });
      return
    }finally{
      props.closeLoader();
    }
    if(registeredUser) {
      setCurrentUser(registeredUser);
      setCurrentLevel(registeredUser.current_level);
      await Preferences.set({
        key: "isLoggedIn",
        value: registeredUser._id,
      });
      setIsRegisteredUser(true);
      props.closeModal();
      router.push("/home");
    }
    else{
      present({
        duration: TOAST_DURATION,
        message:"Email Allready Exist In Our Database",
      });
    }
  };
  return (
    <form onSubmit={signUp} className="register-container">
      <IonAlert
        isOpen={showAlert.isOpen}
        onDidDismiss={() => setShowAlert({ ...showAlert, isOpen: false })}
        header={showAlert.header}
        subHeader={showAlert.subHeader}
        message={showAlert.message}
        buttons={showAlert.buttons}
      />
      <div className="regiseter__left">
        <IonItem lines={"none"}>
          <IonInput
            // required
            onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}
            color={"white"}
            placeholder="Email"
            autocomplete="email"
            inputMode="email"
            // type="email"
          ></IonInput>
        </IonItem>
        <IonItem lines={"none"}>
          <IonInput
            // required
            color={"white"}
            onIonChange={(e) => setUser({ ...user, nickname: e.detail.value! })}
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
            // required
            onIonChange={(e) => setUser({ ...user, password: e.detail.value! })}
            color={"white"}
            placeholder="Password"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
        <IonItem lines={"none"}>
          <IonInput
            // required
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            color={"white"}
            placeholder="Password Confirm"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
      </div>

      <div className="register-container__gender">
        <IonRadioGroup
          onIonChange={(e) => genderHandler(e.detail.value)}
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
