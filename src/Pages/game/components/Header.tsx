import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { type } from "os";
import React, { useState } from "react";
import { usePlayerDataContext } from "../../context/PlayerDataContext";
import "../styles/header.scss";

type Props = {
};

const Header: React.FC<Props> = () => {
  const router = useIonRouter();
  const {playerData} = usePlayerDataContext()
  return (
    <div className="header-container">
      <div className="header__data">
      <span>Steps: {playerData.steps}</span>
      <span>Turn: {playerData.isPlayerTurn ? "Player" : "Zombies"}</span>
      </div>
      <div className="header__buttons">
      <IonButton fill="outline">Hint</IonButton>
      <IonButton fill="outline" onClick={()=>router.push('/home')}>
      <IonIcon  color="warning" icon={arrowForward}/>

      </IonButton>

      </div>
    </div>
  );
};

export default Header;
