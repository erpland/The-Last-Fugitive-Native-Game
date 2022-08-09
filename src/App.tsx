import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  setupIonicReact,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./styles/home.css"
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonContent class="ion-padding" className="main__content">
      <div className="container">
        <Header/>
        <MainTitle/>
      </div>
    </IonContent>
  </IonApp>
);

export default App;
