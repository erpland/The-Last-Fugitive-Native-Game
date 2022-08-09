import React from "react";
import { IonImg, IonThumbnail } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { star, heart, add } from "ionicons/icons";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="header">
      <div className="profilebox__container">
        <IonImg src="/assets/avatars/zombie_fa_5.png" />
      </div>
      <div className="upperbox__container">
        <div className="rankbox__container">
          <IonIcon icon={star} className="upperbox__icon" color={"warning"} />
          <span>300</span>
        </div>
        <div className="lifesbox__container">
          <IonIcon icon={heart} className="upperbox__icon" color={"danger"} />
          <span>1/3</span>
          <IonIcon icon={add} className="upperbox__icon" color={"success"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
