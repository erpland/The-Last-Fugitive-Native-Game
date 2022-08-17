import {
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useRef } from "react";
import { star, lockClosed } from "ionicons/icons";
import { useUserContext } from "../../context/UserContext";
import { useLevelContext } from "../../context/LevelContext";

interface Levels {
  code: number;
  stars: number | null;
  isOpen: boolean;
}

// const dummyLevels: Levels[] = [
//   {
//     code: 1,
//     stars: 3,
//     isOpen: true,
//   },
//   {
//     code: 2,
//     stars: 2,
//     isOpen: true,
//   },
//   {
//     code: 3,
//     stars: 1,
//     isOpen: true,
//   },
//   {
//     code: 4,
//     stars: null,
//     isOpen: true,
//   },
//   {
//     code: 5,
//     stars: null,
//     isOpen: false,
//   },
// ];

type Props = {};

const LevelsModal: React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const {currentUser} = useUserContext()
  const {allLevels,currentLevel} = useLevelContext()
  const levelsCodes = allLevels.map(level=>level.code)
  const userRanks = currentUser.level_rank.map(level=>level.rank)
  const levels = levelsCodes.map((code,index) => {
    return {
      code,
      stars:userRanks[index] || null,
      isOpen:code<=currentLevel ? true : false
    }
  })
  let levelsBoxes = levels.map((level) => (
    <LevelBox
      key={level.code}
      code={level.code}
      stars={level.stars}
      isOpen={level.isOpen}
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

const LevelBox = ({ code, stars, isOpen }: Levels): JSX.Element => {
  let levelStars = [...Array(stars)].map((s, i) => {
    if (stars) return <IonIcon key={i} icon={star} color={"warning"} />;
  });

  return (
    <div className="level-box">
      <div className="level-box__stars">{levelStars}</div>
      <div className="level-box__box">
        <span>
          {isOpen ? code : <IonIcon icon={lockClosed} color="warning" />}
        </span>
      </div>
    </div>
  );
};
