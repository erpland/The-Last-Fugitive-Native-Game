import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "./Pages/home/Home";
import Game from "./Pages/game/Game";
import Connect from "./Pages/connect/Connect";
import MusicContextProvider from "./Pages/context/MusicContext";
import { useUserContext } from "./Pages/context/UserContext";
type Props = {
  // isRegisteredUser:boolean
};

const Routes: React.FC<Props> = () => {
  const {isRegisteredUser} = useUserContext()
  return (
    <IonReactRouter>
      <IonRouterOutlet>
            <MusicContextProvider>
              {/* <Route path="/connect" component={Connect} /> */}
              {/* {!isRegisteredUser && <Redirect exact from="/" to="/connect" />} */}
              {/* {isRegisteredUser && <Redirect exact from="/" to="/home" />} */}
              {/* <Route path="/home" component={Home} /> */}
              <Route path="/" component={Game}  />
            </MusicContextProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
