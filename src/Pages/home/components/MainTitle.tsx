import { IonButton } from "@ionic/react";
import { useUserContext } from "../../context/UserContext";

type Props = {
  connectButtonHandler: () => void;
};

const MainTitle: React.FC<Props> = ({ connectButtonHandler }) => {
  const { isRegisteredUser } = useUserContext();


  return (
    <div className="main__title">
      <h1>The Last Fugitive</h1>
      <IonButton id="open-levels-modal" color="primary" style={{ width: "70%" }} size="large">
        START
      </IonButton>
      <IonButton
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
