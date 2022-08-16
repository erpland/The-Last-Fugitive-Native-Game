import { IonButton, IonInput, IonItem } from "@ionic/react";
import React, { SetStateAction, useState, useContext } from "react";
import { UserLoginType, UserContextType } from "../../../Types/userTypes";
import { UserContext } from "../../context/UserContext";
import { loginUser } from "../../../Database/database";
type Props = {
  setisLoginComponent: React.Dispatch<SetStateAction<boolean>>;
};

const Login: React.FC<Props> = (props) => {
  const [user, setUser] = useState<UserLoginType>({
    email: "",
    password: "",
  });
  const { setCurrentUser } = useContext(
    UserContext
  ) as UserContextType;
  
  const validateEmail = (e: any) => {
    let email = e.target.value;
    setUser({ ...user, email });
  };
  
  const validatePassword = (e: any) => {
    let password = e.target.value;
    setUser({ ...user, password });
  };
  
  const login = async (e: any) => {
    e.preventDefault();
    const loggedUser = await loginUser(user);
    console.log("logged in:",loggedUser);
    if (loggedUser) {
      await setCurrentUser(loggedUser);
    }
  };
  return (
    <form className="login-container" onSubmit={login}>
      <IonItem lines={"none"}>
        <IonInput
          onIonChange={validateEmail}
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
          onIonChange={validatePassword}
          required
          color={"white"}
          placeholder="Password"
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
