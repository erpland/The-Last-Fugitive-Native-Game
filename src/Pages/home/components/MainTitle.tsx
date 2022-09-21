import { Preferences } from "@capacitor/preferences";
import { IonButton, useIonRouter } from "@ionic/react";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const MainTitle = (props: Props) => {
  const {isRegisteredUser} = useUserContext()
  const router = useIonRouter();

  const connectButtonHandler=async()=>{
    if(isRegisteredUser){
      await Preferences.remove({key:"isLoggedIn"})
    }
    router.push("/connect");
  }

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
        // id="open-connect-modal"
        onClick={connectButtonHandler}
        style={{ width: "70%", color: "white" }}
        size="large"
        fill={"outline"}
      >
        {isRegisteredUser ? "LOGOUT" : "CONNECT"}
      </IonButton>
    </div>
  );
};

export default MainTitle;
