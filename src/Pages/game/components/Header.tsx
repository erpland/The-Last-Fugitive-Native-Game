//קומפוננטה לייצוג חלק עליון של המסך-הצגת נתונים על צעדים, תור,הצגת רמז על ידי חישוב מתאים
import { IonButton, IonIcon, useIonAlert, useIonRouter } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import React from "react";
import { useGameSettingsContext } from "../../context/GameSettingsContext";
import "../styles/header.scss";

type Props = {};

const Header: React.FC<Props> = () => {
  const router = useIonRouter();
  const { settingsState, getHint } = useGameSettingsContext();
  const { hint, isPlayerTurn, steps } = settingsState;
  const [presentAlert] = useIonAlert();
  const handleHint = () => {
    getHint();
  };
  const goBackHandler = ()=>{
    presentAlert({
      header: 'Wait!!!',
      message:"Are You Sure You Want To Exit? Progress Will Be Lost!",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            router.push("/home")
          },
        },
      ],
    })
  }
  return (
    <div className="header-container">
      <div className="header__data">
        <span>Steps: {steps}</span>
        <span>Turn: {isPlayerTurn ? "Player" : "Monsters"}</span>
      </div>
      {hint && (
        <div className="header__hints">
          <h4>{hint}</h4>
        </div>
      )}
      <div className="header__buttons">
        <IonButton fill="outline"  onClick={handleHint}>
          Hint
        </IonButton>
        <IonButton fill="outline" onClick={goBackHandler}>
          <IonIcon color="warning" icon={arrowForward} />
        </IonButton>
      </div>
    </div>
  );
};

export default Header;
