import {
  IonButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { star, refresh, arrowForward } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { usePlayerDataContext } from "../../context/PlayerDataContext";
import "../../home/styles/home.scss";
import { useIonRouter } from "@ionic/react";
import RatingBar from "./RatingBar";
import { useUserContext } from "../../context/UserContext";
import { updateLevelPopulatiry } from "../../../Database/database";
import { useLevelContext } from "../../context/LevelContext";
interface stepCapType {
  code: number;
  step: number;
}
interface Props {
  FinishModal: {
    isModalOpen: boolean;
    isWon: boolean;
    stepCap: stepCapType[];
    levelCode:number,
    resetLevel:()=>void;
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

const FinishModal: React.FC<Props["FinishModal"]> = ({
  isModalOpen,
  isWon,
  stepCap,
  levelCode,
  resetLevel
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const data = {
    title: isWon ? "VICOTRY" : "GAME OVER",
    color: isWon ? "var(--ion-color-success)" : "var(--ion-color-danger)",
  };
  const { playerData,setPlayerData } = usePlayerDataContext();
  const {setCurrentUser,currentUser,isGuest} = useUserContext()
  const [levelRating, setLevelRating] = useState(currentUser.level_rank.length===levelCode ?
   currentUser.level_rank[levelCode-1].popularity! : 0);

  const router = useIonRouter();
  const calcStars = () => {
    if (playerData.steps <= stepCap[0].step) {
      return 3;
    } else if (playerData.steps <= stepCap[1].step) return 2;
    else {
      return 1;
    }
  };

  const handleRefresh=()=>{
    modal.current?.dismiss()
    setPlayerData({ steps:0, isPlayerTurn: true });
    resetLevel()
  }
  const backToHomePage= ()=>{
    setPlayerData({ steps:0,isPlayerTurn:true })
    const levelRank = currentUser.level_rank
    levelRank[levelCode-1].popularity = levelRating
    setCurrentUser({...currentUser,level_rank:levelRank})
    updateLevelPopulatiry(currentUser._id,currentUser.token, {
      level_code:levelCode,
      popularity:levelRating
    },isGuest)
    router.push('/home')
    modal.current?.dismiss()
  }
  return (
    <IonModal
      id="finish-modal"
      ref={modal}
      // trigger="open-finish-modal"
      isOpen={isModalOpen}
      backdropDismiss={false}
      
      
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle color={isWon ? "success" : "danger"}>{data.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="finish-modal__body">
        <FinishIcons stars={isWon ? calcStars(): 0} />
        <h2 style={{ color: data.color }}>Level {levelCode}</h2>
        <ModalText
          label={"Moves"}
          value={playerData.steps}
          color={data.color}
        />
        <RatingBar
        rating = {levelRating}
        setRating = {(val:any)=>setLevelRating(val)}
        />

        <div className="finish-modal__button-container">
          <IonButton fill="outline" onClick={()=>handleRefresh()} id={"open-levels-modal"}>
            <IonIcon slot="icon-only" icon={refresh} color="warning" />
          </IonButton>
          <IonButton fill="outline" onClick={()=>backToHomePage()}>
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
