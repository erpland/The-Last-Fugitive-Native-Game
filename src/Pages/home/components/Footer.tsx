import React from "react";
import { IonIcon } from "@ionic/react";
import { shareSocial, thumbsUp, settings } from "ionicons/icons";
import { Share } from '@capacitor/share';
type Props = {};

const Footer = (props: Props) => {

  const share = async ()=>{
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }
  return <div className="main__footer">
    <IonIcon icon={shareSocial} id="open-finish-modal" onClick={share}/>
    <IonIcon  icon={thumbsUp} id="open-finish-modal"/>
    <IonIcon icon={settings} id="open-settings-modal"/>
  </div>;
};

export default Footer;
