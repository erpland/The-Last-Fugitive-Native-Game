import { Preferences } from "@capacitor/preferences";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonPage,
  IonProgressBar,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  getAllLevels,
  getAllHints,
  getAllAvatars,
  fetchUserByid,
} from "../Database/database";
import { useLevelContext } from "./context/LevelContext";
import { useUserContext } from "./context/UserContext";
import './LoaderStyles.scss'
type Props = {
  finshedLoading: () => void;
};

const Loader: React.FC<Props> = ({ finshedLoading }) => {
  const [loading, setLoading] = useState({
    progress: 0,
    text: "loading content...",
    progressColor: "success",
    textColor:"light",
    isDone:false
  });
  const { setCurrentUser, setAvatars, setIsRegisteredUser,setRemainingGames } = useUserContext();
  const { setAllLevels, setCurrentLevel, setHints } = useLevelContext();

  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    header: "Error...",
    subHeader: "",
    message:
      "We had some trouble getting game data.\n Please check you internet connection or try again later",
    buttons: [
      { text: "CANCEL" },
      { text: "TRY AGAIN", handler: () => window.location.reload() },
    ],
  });
  useEffect(() => {
    const getAllData = async () => {
      // await Preferences.remove({key:"isLoggedIn"})
      try {
        const allLevels = await getAllLevels();
        setLoading({ ...loading, progress: 0.3 });
        const allHints = await getAllHints();
        setLoading({ ...loading, progress: 0.5 });
        const allAvatars = await getAllAvatars();
        setLoading({ ...loading, progress: 0.8 });
        setAllLevels(allLevels);
        setHints(allHints);
        setAvatars(allAvatars);

        const userId = (await Preferences.get({ key: "isLoggedIn" })).value;
        let remainingGames=(await Preferences.get({ key: "games" })).value;
        if(!remainingGames){
          (await Preferences.set({ key: "games",value:"5" }))
          remainingGames = "5"
        }
        setRemainingGames(parseInt(remainingGames!))
        let musicVolume = (await Preferences.get({ key: "music" })).value;
        let soundVolume = (await Preferences.get({ key: "sound" })).value;

        if(!musicVolume){
          (await Preferences.set({ key:"music",value:"0.9" }))
        }
        if(!soundVolume){
          (await Preferences.set({ key:"sound",value:"0.9" }))
        }
        if (userId) {
          const loggedUser = await fetchUserByid(userId);
          setCurrentUser(loggedUser);
          setCurrentLevel(loggedUser.current_level);
          setIsRegisteredUser(true);
        } else {
          setIsRegisteredUser(false);
        }
        setLoading({ ...loading, progress: 1,isDone:true });
        
      } catch {
        setShowAlert({
          ...showAlert,
          isOpen: true,
        });
        setLoading({
          progress: 1,
          text: "Error",
          progressColor: "danger",
          textColor:'danger',
          isDone:false
        });
      }
    };
    getAllData();
  }, []);

  return (
    <IonPage>
    <IonContent>
      <IonAlert
        isOpen={showAlert.isOpen}
        onDidDismiss={() => setShowAlert({ ...showAlert, isOpen: false })}
        header={showAlert.header}
        subHeader={showAlert.subHeader}
        message={showAlert.message}
        buttons={showAlert.buttons}
      />
      <div className="loader-container">
        <div className="content-wrapper">

        <h1>The Last Fugitive</h1>
        <IonProgressBar
          color={loading.progressColor}
          className="progress"
          value={loading.progress}
          ></IonProgressBar>
        <IonText color={loading.textColor}>
          <h5>{loading.text}</h5>
        </IonText>
          </div>
        {loading.isDone &&
        <div className="button-wrapper">
          <IonButton className="button-53" onClick={()=>finshedLoading()}>Continue</IonButton>
        </div>}
      </div>
    </IonContent>
    </IonPage>
  );
};

export default Loader;

const styles = {
  
};
