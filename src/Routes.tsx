import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "./Pages/home/Home";
import Game from "./Pages/game/Game";
import Connect from "./Pages/connect/Connect";
import UserContextProvider from "./Pages/context/UserContext";
import LevelContextProvider from "./Pages/context/LevelContext";
import MusicContextProvider from "./Pages/context/MusicContext";
type Props = {};

const Routes: React.FC = (props: Props) => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <UserContextProvider>
          <LevelContextProvider>
            <MusicContextProvider>
              {/* <Route path="/connect" component={Connect} /> */}
              {/* <Redirect exact from="/" to="/connect" /> */}
              {/* <Route path="/home" component={Home} /> */}
              <Route path="/game" component={Game}  />
            </MusicContextProvider>
          </LevelContextProvider>
        </UserContextProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
