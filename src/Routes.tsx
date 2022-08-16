import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "./Pages/home/Home";
import Game from "./Pages/game/Game";
import Connect from "./Pages/connect/Connect";
import UserContextProvider from "./Pages/context/UserContext";
import LevelContextProvider from "./Pages/context/LevelContext";

type Props = {};

const Routes: React.FC = (props: Props) => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <UserContextProvider>
          <LevelContextProvider>
            <Route path="/" component={Connect}/>
            <Route path="/home" component={Home} />
            <Route path={`/game/:level`} component={Game} />
          </LevelContextProvider>
        </UserContextProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
