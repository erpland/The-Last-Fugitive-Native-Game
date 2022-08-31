import React, { useEffect, useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "./Pages/home/Home";
import Connect from "./Pages/connect/Connect";
import MusicContextProvider from "./Pages/context/MusicContext";
import { useUserContext } from "./Pages/context/UserContext";
import PlayerDataContextProvider from "./Pages/context/PlayerDataContext";
import GamePage from "./Pages/game/GamePage";

type Props = {
  // isRegisteredUser:boolean
};
interface PlayDatesType{
  start_date:Date
  end_date:Date | null
}
const Routes: React.FC<Props> = () => {
  const {isRegisteredUser,currentUser,isGuest} = useUserContext()
  
  return (
    <IonReactRouter>
      <IonRouterOutlet>
            <MusicContextProvider>
              <Route path="/connect" component={Connect} />
              {!isRegisteredUser && <Redirect exact from="/" to="/connect" />}
              {isRegisteredUser && <Redirect exact from="/" to="/home" />}
              <Route path="/home" component={Home} />
              <PlayerDataContextProvider>
              <Route path="/game" component={GamePage}  />
              </PlayerDataContextProvider>
            </MusicContextProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
