import { IonButton, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { star, refresh, arrowForward } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { useGameSettingsContext } from "../../context/GameSettingsContext";
import "../../home/styles/home.scss";
import { useIonRouter } from "@ionic/react";
import RatingBar from "./RatingBar";
import { useUserContext } from "../../context/UserContext";
import { updateLevelPopulatiry } from "../../../Database/database";
import { useGamePlayContext } from "../../context/GamePlayContext";
import LoseAnimation from "./LoseAnimation";

interface stepCapType {
  code: number;
  step: number;
}
interface Props {
  FinishModal: {
    stepCap: stepCapType[];
    levelCode: number;
    resetLevel: () => void;
  };
  TextProps: {
    label: string;
    value: number;
    color: string;
  };
  IconsProps: {
    stars: 0 | 1 | 2 | 3;
  };
}

const FinishModal: React.FC<Props["FinishModal"]> = ({ stepCap, levelCode, resetLevel }) => {
  const { gamePlayState, gamePlayDispatch } = useGamePlayContext();
  const { gameOver } = gamePlayState;
  const modal = useRef<HTMLIonModalElement>(null);
  const data = {
    title: gameOver.isWon ? "VICOTRY" : "GAME OVER",
    color: gameOver.isWon ? "var(--ion-color-success)" : "var(--ion-color-danger)",
  };
  const { settingsState, settingsDispatch } = useGameSettingsContext();
  const { steps } = settingsState;
  const { setCurrentUser, currentUser, isGuest } = useUserContext();
  const [levelRating, setLevelRating] = useState(
    levelCode <= currentUser.level_rank.length
      ? currentUser.level_rank[levelCode - 1].popularity!
      : 0
  );
  const router = useIonRouter();
  const calcStars = () => {
    if (steps <= stepCap[0].step) {
      return 3;
    } else if (steps <= stepCap[1].step) return 2;
    else {
      return 1;
    }
  };
  const handleRefresh = () => {
    modal.current?.dismiss();
    resetLevel();
  };

  const backToHomePage = () => {
    settingsDispatch({ type: "RESET" });
    if (gameOver.isWon) {
      const levelRank = currentUser.level_rank;
      levelRank[levelCode - 1].popularity = levelRating;
      setCurrentUser({ ...currentUser, level_rank: levelRank });
      updateLevelPopulatiry(
        currentUser._id,
        currentUser.token,
        {
          level_code: levelCode,
          popularity: levelRating,
        },
        isGuest
      );
    }
    router.push("/home");
    modal.current?.dismiss();
  };

  return (
    <IonModal id="finish-modal" ref={modal} isOpen={gameOver.isGameOver} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle color={gameOver.isWon ? "success" : "danger"}>{data.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="finish-modal__body">
        {!gameOver.isWon && (
          <>
            <h2 style={{ color: data.color, margin: 0 }}>Level {levelCode}</h2>
            <LoseAnimation />
            <span style={{ color: data.color }}>You Lost...</span>
          </>
        )}
        {gameOver.isWon && (
          <>
            <FinishIcons stars={gameOver.isWon ? calcStars() : 0} />
            <h2 style={{ color: data.color }}>Level {levelCode}</h2>
            <ModalText label={"Moves"} value={steps} color={data.color} />
            <RatingBar rating={levelRating} setRating={(val: any) => setLevelRating(val)} />
          </>
        )}
        <div className="finish-modal__button-container">
          <IonButton fill="outline" onClick={() => handleRefresh()} id={"open-levels-modal"}>
            <IonIcon slot="icon-only" icon={refresh} color="warning" />
          </IonButton>
          <IonButton fill="outline" onClick={() => backToHomePage()}>
            <IonIcon slot="icon-only" icon={arrowForward} color="warning" />
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default FinishModal;

const FinishIcons: React.FC<Props["IconsProps"]> = ({ stars }) => {
  const starsToRender = [...Array(3)].map((s, i) => {
    if (i < stars) {
      return <IonIcon key={i} icon={star} color="warning" />;
    }
    return <IonIcon key={i} icon={star} />;
  });

  return (
    <>
      <div className="finish-modal__icons">{starsToRender}</div>
    </>
  );
};

const ModalText: React.FC<Props["TextProps"]> = ({ label, value, color }) => {
  return (
    <div className="text-container">
      <span className="modal-text__label">{label}</span>
      <span className="modal-text__value" style={{ color: color }}>
        {value}
      </span>
    </div>
  );
};
