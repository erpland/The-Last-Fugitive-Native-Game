//דף הניווטים של המשחק
import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, useIonRouter } from "@ionic/react";
import Home from "./Pages/home/Home";
import Connect from "./Pages/connect/Connect";
import MusicContextProvider from "./Pages/context/MusicContext";
import { useUserContext } from "./Pages/context/UserContext";
import GamePage from "./Pages/game/GamePage";
import { App } from "@capacitor/app";


type Props = {};

const Routes: React.FC<Props> = () => {
  //משיכה של סטייט בוליאני-האם משתמש רשום
  //משמש אותנו להעביר לדף התחברות/דף ראשי
  const { isRegisteredUser } = useUserContext();
  
  return (
    <IonReactRouter>
      <IonRouterOutlet>
       
        <MusicContextProvider>
          <Route path="/connect" component={Connect} />
          {!isRegisteredUser && <Redirect exact from="/" to="/connect" />}
          {isRegisteredUser && <Redirect exact from="/" to="/home" />}
          <Route path="/home" component={Home} />
          <Route path="/game" component={GamePage} />
        </MusicContextProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
