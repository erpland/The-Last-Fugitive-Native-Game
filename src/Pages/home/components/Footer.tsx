import React from "react";
import { IonIcon } from "@ionic/react";
import { shareSocial, thumbsUp, settings } from "ionicons/icons";
import { Share } from '@capacitor/share';
type Props = {};

const Footer = (props: Props) => {

  const share = async ()=>{
    await Share.share({
      title: 'Cool Game',
      text: 'Just Played A Really Cool Game Called The Last Fugitive',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share The Game With Other Friends',
    });
  }
  return <div className="main__footer">
    <IonIcon icon={shareSocial} onClick={share}/>
    {/* <IonIcon  icon={thumbsUp} id="open-finish-modal"/> */}
    <IonIcon icon={settings} id="open-settings-modal"/>
  </div>;
};

export default Footer;
