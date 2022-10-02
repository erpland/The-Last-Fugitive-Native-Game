import {
  IonHeader,
  IonIcon,
  IonModal,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { star, lockClosed } from "ionicons/icons";
import { useUserContext } from "../../context/UserContext";
import { useLevelContext } from "../../context/LevelContext";
import { useIonRouter } from "@ionic/react";
import { TOAST_DURATION } from "../../../utils/Constants";

interface Levels {
  code: number;
  stars: number | null;
  isOpen: boolean;
}

type Props = {};

const LevelsModal: React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { currentUser } = useUserContext();
  const { allLevels, currentLevel } = useLevelContext();
  const levelsCodes = allLevels.map((level) => level.code);
  const userRanks = currentUser.level_rank.map((level) => level.rank);
  const levels = levelsCodes.map((code, index) => {
    return {
      code,
      stars: userRanks[index] || null,
      isOpen: code <= currentLevel ? true : false,
    };
  });
  let levelsBoxes = levels.map((level) => (
    <LevelBox
      key={level.code}
      code={level.code}
      stars={level.stars}
      isOpen={level.isOpen}
      closeModal={() => modal.current?.dismiss()}
    />
  ));

  return (
    <IonModal id="levels-modal" ref={modal} trigger="open-levels-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Levels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="levels-modal__body">{levelsBoxes}</div>
    </IonModal>
  );
};

export default LevelsModal;

const LevelBox = ({ code, stars, isOpen, closeModal }: Levels | any): JSX.Element => {
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { remainingGames } = useUserContext();
  const [present] = useIonToast();
  const startLevel = () => {
    if (isOpen) {
      if (remainingGames!.current > 0) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          closeModal();
          router.push("/game", "forward", "push", code);
        }, 2000);
      } else {
        present({
          duration: TOAST_DURATION,
          message: "No remaining lives! please wait 3 minutes to charge life",
        });
        return;
      }
    }
  };
  let levelStars = [...Array(stars)].map((s, i) => {
    if (stars) return <IonIcon key={i} icon={star} color={"warning"} />;
  });

  return (
    <div className="level-box">
      {isLoading && (
        <IonSpinner color={"warning"} name="bubbles" style={{ position: "absolute" }} />
      )}
      <div className="level-box__stars">{levelStars}</div>
      <div className="level-box__box" onClick={startLevel}>
        <span>{!isLoading && (isOpen ? code : <IonIcon icon={lockClosed} color="warning" />)}</span>
      </div>
    </div>
  );
};
