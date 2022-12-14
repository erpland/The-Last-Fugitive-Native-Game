//דף התחברות
import React, { SetStateAction, useState, useRef } from "react";
import { IonAlert, IonButton, IonInput, IonItem, useIonToast } from "@ionic/react";
import { UserLoginType } from "../../../Types/userTypes";
import { useUserContext } from "../../context/UserContext";
import { loginUser } from "../../../Database/database";
import { useIonRouter } from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { useLevelContext } from "../../context/LevelContext";
import { TOAST_DURATION } from "../../../utils/Constants";
//הגדרת טיפוסים
type Props = {
  setisLoginComponent: React.Dispatch<SetStateAction<boolean>>;
  openLoader: ({}) => void;
  closeLoader: () => void;
  closeModal: () => void;
  setIsResetModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<Props> = (props) => {
  const router = useIonRouter();
  const [user, setUser] = useState<UserLoginType>({
    email: "",
    password: "",
  });
  const formRef = useRef<HTMLIonItemElement>(null);

  const {
    setCurrentUser,
    setIsRegisteredUser,
    setIsGuest,
  } = useUserContext();
  const { setCurrentLevel } = useLevelContext();
  const [present] = useIonToast();
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    header: "Error...",
    subHeader: "",
    message:
      "We had some trouble login you in.\n Please check your internet connection and try again.",
    buttons: ["OK"],
  });

  const displayPassword = (isPasswordFocus: boolean) => {
    const display = isPasswordFocus ? "display:none;" : "display:unset;";
    if (formRef.current) {
      formRef.current.setAttribute("style", display);
    }
  };

  const passwordBlurHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLElement).blur();
    }
  };

  const openResetModal = () => {
    props.setIsResetModal(true);
    props.setIsLoginModal(false);
  };
//פונקציית התחברות- מקבלת אימייל וסיסמא ומפעילה את פונקציית האימות בשרת
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      present({
        duration: TOAST_DURATION,
        message: "All Fields Are Requierd!",
      });
      return;
    }
    props.openLoader({
      message: "Logging In...",
    });
    let loggedUser;
    try {
      loggedUser = await loginUser(user);
    } catch {
      setShowAlert({ ...showAlert, isOpen: true });
      return;
    } finally {
      props.closeLoader();
    }
    if (loggedUser.status === 400) {
      present({
        duration: TOAST_DURATION,
        message: "Wrong Email Or Password",
      });
    } else if (loggedUser.status === 403) {
      present({
        duration: TOAST_DURATION,
        message: "Your User Has Been Banned, Connect Support For More Information...",
      });
    } else {
      setCurrentUser(loggedUser);
      setCurrentLevel(loggedUser.current_level);
      await Preferences.set({
        key: "isLoggedIn",
        value: loggedUser._id,
      });
      setIsRegisteredUser(true);
      setIsGuest(false);
      props.closeModal();
      router.push("/home");
    }
  };
  return (
    <form className="login-container" onSubmit={login}>
      <IonAlert
        isOpen={showAlert.isOpen}
        onDidDismiss={() => setShowAlert({ ...showAlert, isOpen: false })}
        header={showAlert.header}
        subHeader={showAlert.subHeader}
        message={showAlert.message}
        buttons={showAlert.buttons}
      />
      <IonItem lines={"none"} ref={formRef}>
        <IonInput
          onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}
          // required
          color={"white"}
          placeholder="Email"
          autocomplete="email"
          inputMode="email"
          // type="email"
        ></IonInput>
      </IonItem>
      <IonItem lines={"none"}>
        <IonInput
          onIonChange={(e) => setUser({ ...user, password: e.detail.value! })}
          // required
          color={"white"}
          placeholder="Password"
          onIonFocus={() => displayPassword(true)}
          onIonBlur={() => displayPassword(false)}
          onKeyUp={(e) => passwordBlurHandler(e)}
          autocomplete="new-password"
          type="password"
        ></IonInput>
      </IonItem>
      <p style={{ color: "white" }} onClick={openResetModal}>
        Forgot Password?
      </p>
      <div className="login-container__buttons">
        <IonButton strong={true} color="primary" type="submit">
          Login
        </IonButton>
        <p onClick={() => props.setisLoginComponent(false)}>Dont Have an Account?</p>
      </div>
    </form>
  );
};

export default Login;
