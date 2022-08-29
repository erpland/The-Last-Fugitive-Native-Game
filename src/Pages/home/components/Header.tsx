import React from "react";
import { IonImg } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { star, heart, add } from "ionicons/icons";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const Header = (props: Props) => {
  const {currentUser,remainingGames,isRegisteredUser} = useUserContext()
  const totalRank = currentUser.level_rank.reduce((prev,cur)=>{return prev + cur.rank},0)
  return (
    <div className="header">
      <div className="profilebox__container" id="open-profile-modal" onClick={()=>console.log('aaa')} >
        <IonImg src={currentUser.avatarUrl} />
      </div>
      <div className="upperbox__container">
        <div className="rankbox__container">
          <IonIcon icon={star} color={"warning"} />
          <span>{totalRank}</span>
        </div>
        <div className="lifesbox__container">
          <IonIcon icon={heart} className="upperbox__icon" color={"danger"} />
          <span>{remainingGames} / {isRegisteredUser ? 5 : 3}</span>
          <IonIcon icon={add} className="upperbox__icon" color={"success"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
