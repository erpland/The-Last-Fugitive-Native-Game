import {
  IonButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { star, menu, refresh, arrowForward } from "ionicons/icons";
import React, { useRef } from "react";
import { usePlayerDataContext } from "../../context/PlayerDataContext";
import "../styles/home.scss";
import { useIonRouter } from "@ionic/react";
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
    reloadPage:()=>void;
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
  reloadPage
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const data = {
    title: isWon ? "VICOTRY" : "GAME OVER",
    color: isWon ? "var(--ion-color-success)" : "var(--ion-color-danger)",
  };
  const { playerData,setPlayerData } = usePlayerDataContext();
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
    reloadPage()
  }
  const backToHomePage=()=>{
    setPlayerData({ steps:0,isPlayerTurn:true })
    router.push('/home')
    modal.current?.dismiss()
  }
  return (
    <IonModal
      id="finish-modal"
      ref={modal}
      trigger="open-finish-modal"
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
        {/* <ModalText label={"Score"} value={1} color={data.color} /> */}

        <div className="finish-modal__button-container">
          {/* <IonButton fill="outline">
            <IonIcon slot="icon-only" icon={menu} color="warning" />
          </IonButton> */}
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
