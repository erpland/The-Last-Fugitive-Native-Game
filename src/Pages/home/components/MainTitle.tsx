import { IonButton } from "@ionic/react";
import React from "react";

type Props = {};

const MainTitle = (props: Props) => {
  return (
    <div className="main__title">
      <h1>The Last Fugitive</h1>
      <IonButton
        id="open-levels-modal"
        color="primary"
        style={{ width: "70%" }}
        size="large"
      >
        START
      </IonButton>
      <IonButton
        id="open-connect-modal"
        style={{ width: "70%", color: "white" }}
        size="large"
        fill={"outline"}
      >
        CONNECT
      </IonButton>
    </div>
  );
};

export default MainTitle;
