import { IonButton } from "@ionic/react";
import { type } from "os";
import React, { useState } from "react";
import { usePlayerDataContext } from "../../context/PlayerDataContext";
import "../styles/header.scss";

type Props = {
};

const Header: React.FC<Props> = () => {
  const {playerData} = usePlayerDataContext()
  return (
    <div className="header-container">
      <span>Steps: {playerData.steps}</span>
      <span>Turn: {playerData.isPlayerTurn ? "Player" : "Zombies"}</span>
      <IonButton fill="outline">Hint</IonButton>
    </div>
  );
};

export default Header;
