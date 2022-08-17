import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { UserSignupType } from "../../../Types/userTypes";
import React, { SetStateAction, useState } from "react";
import { getAllAvatars, getAllHints, getAllLevels, registerUser } from "../../../Database/database";
import { useUserContext } from "../../context/UserContext";
import { useIonRouter} from "@ionic/react";
import { useLevelContext } from "../../context/LevelContext";
import { Preferences } from "@capacitor/preferences";
type Props = {
  setisLoginComponent: React.Dispatch<SetStateAction<boolean>>;
  openLoader: ({}) => void;
  closeLoader: ()=>void;
  closeModal: ()=>void;
};

const Register: React.FC<Props> = (props) => {
  const router = useIonRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<UserSignupType>({
    nickname: "",
    email: "",
    password: "",
    avatarCode: 0,
    avatarUrl: "/assets/avatars/male1.png",
    gender: 1,
  });
  const { setCurrentUser,setAvatars } = useUserContext()
  const {setAllLevels, setCurrentLevel,setHints} = useLevelContext()
  
  
  const genderHandler = (gender:number) => {
    let avatarUrl =
      gender === 1
        ? "/assets/avatars/male1.png"
        : "/assets/avatars/female1.png";

    setUser({ ...user, gender, avatarUrl });
  };

  const signUp = async (e: React.FormEvent) => {
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
    props.openLoader({
      message: 'Loggin In...',
    })
    const registerdUser = await registerUser(user);
    props.closeLoader();

    if (registerdUser) {
      setCurrentUser(registerdUser);
      setCurrentLevel(registerdUser.current_level)
      await Preferences.set({
        key : 'isLoggedIn',
        value: registerdUser._id,
      })
      router.push("/home");
      props.closeModal()
    }
    
  };
  return (
    <form onSubmit={signUp} className="register-container">
      <div className="regiseter__left">
        <IonItem lines={"none"}>
          <IonInput
          required
            onIonChange={(e)=>setUser({ ...user, email:e.detail.value! })}
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
            onIonChange={(e)=>setUser({ ...user, nickname:e.detail.value! })}
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
          onIonChange={(e)=>setUser({ ...user, password:e.detail.value! })}
            color={"white"}
            placeholder="Password"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
        <IonItem lines={"none"}>
          <IonInput
          required
          onIonChange={(e)=>setConfirmPassword(e.detail.value!)}
            color={"white"}
            placeholder="Password Confirm"
            autocomplete="new-password"
            type="password"
          ></IonInput>
        </IonItem>
      </div>

      <div className="register-container__gender">
        <IonRadioGroup
          onIonChange={(e)=>genderHandler(e.detail.value)}
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
