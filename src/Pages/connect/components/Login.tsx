import React, { SetStateAction, useState, useRef } from "react";
import { IonButton, IonInput, IonItem } from "@ionic/react";
import { InputKeyUpEvent } from "../../../Types/ionicTypes";
import { UserLoginType } from "../../../Types/userTypes";
import { useUserContext } from "../../context/UserContext";
import { getAllLevels, loginUser } from "../../../Database/database";
import { useIonRouter } from "@ionic/react";
import { useLevelContext } from "../../context/LevelContext";
type Props = {
  setisLoginComponent: React.Dispatch<SetStateAction<boolean>>;
  openLoader: ({})=>void;
  closeLoader: ()=>void;
  closeModal: ()=>void;
};

const Login: React.FC<Props> = (props) => {
  const router = useIonRouter();
  const [user, setUser] = useState<UserLoginType>({
    email: "",
    password: "",
  });
  const formRef = useRef<HTMLIonItemElement>(null);

  const { setCurrentUser } = useUserContext();
  const { setAllLevels, setCurrentLevel } = useLevelContext();

  const displayPassword = (isPasswordFocus: boolean) => {
    const display = isPasswordFocus ? "display:none;" : "display:unset;";
    if (formRef.current) {
      formRef.current.setAttribute('style',display)
    }
  };

  const passwordBlurHandler = (e:React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLElement).blur();
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    props.openLoader({
      message: "Logging In...",
    });
    const loggedUser = await loginUser(user);
    const allLevels = await getAllLevels();
    props.closeLoader();
    if (loggedUser && allLevels) {
      setCurrentUser(loggedUser);
      setAllLevels(allLevels);
      setCurrentLevel(loggedUser.current_level);
      router.push("/home");
      props.closeModal();
    }
  };
  return (
    <form className="login-container" onSubmit={login}>
      <IonItem lines={"none"} ref={formRef}>
        <IonInput
          onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}
          required
          color={"white"}
          placeholder="Email"
          autocomplete="email"
          inputMode="email"
          type="email"
        ></IonInput>
      </IonItem>
      <IonItem lines={"none"}>
        <IonInput
          onIonChange={(e) => setUser({ ...user, password: e.detail.value! })}
          required
          color={"white"}
          placeholder="Password"
          onIonFocus={() => displayPassword(true)}
          onIonBlur={() => displayPassword(false)}
          onKeyUp={(e)=>passwordBlurHandler(e)}
          autocomplete="new-password"
          type="password"
        ></IonInput>
      </IonItem>
      <div className="login-container__buttons">
        <IonButton strong={true} color="primary" type="submit">
          Login
        </IonButton>
        <p onClick={() => props.setisLoginComponent(false)}>
          Dont Have an Account?
        </p>
      </div>
    </form>
  );
};

export default Login;
