import React, { SetStateAction } from "react";
import { IonImg, useIonToast } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { star, heart } from "ionicons/icons";
import { useUserContext } from "../../context/UserContext";
import { TOAST_DURATION } from "../../../utils/constants";

type Props = {
  setIsProfileModal: React.Dispatch<SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ setIsProfileModal }) => {
  const { currentUser, remainingGames, isRegisteredUser } = useUserContext();
  const totalRank = currentUser.level_rank.reduce((prev, cur) => {
    return prev + cur.rank;
  }, 0);
  const [present] = useIonToast();

  const openProfileModal = () => {
    if (isRegisteredUser) {
      setIsProfileModal(true);
    } else {
      present({
        duration: TOAST_DURATION,
        message: "Only Registerd Users Can View And Edit Their Profile!",
      });
    }
  };
  return (
    <div className="header">
      <div className="profilebox__container" onClick={openProfileModal}>
        <IonImg src={currentUser.avatarUrl} />
      </div>
      <div className="upperbox__container">
        <div className="rankbox__container">
          <IonIcon icon={star} color={"warning"} />
          <span>{totalRank}</span>
        </div>
        <div className="lifesbox__container">
          <IonIcon icon={heart} className="upperbox__icon" color={"danger"} />
          <span>
            {remainingGames?.current} / {remainingGames?.max}
          </span>
          {/* <IonIcon icon={add} className="upperbox__icon" color={"success"} /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
