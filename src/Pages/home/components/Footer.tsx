import React from "react";
import { IonIcon } from "@ionic/react";
import { shareSocial, thumbsUp, settings } from "ionicons/icons";
type Props = {};

const Footer = (props: Props) => {
  return <div className="main__footer">
    <IonIcon icon={shareSocial}/>
    <IonIcon  icon={thumbsUp}/>
    <IonIcon icon={settings} id="open-settings-modal"/>
  </div>;
};

export default Footer;
