import React, { useRef } from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonSlide,
  IonSlides,
  IonText,
} from "@ionic/react";
import '../styles/tutorial.scss'
type Props = {};
const slideOpts = {
  initialSlide: 0,
  speed: 400,
};
const Tutorial: React.FC<Props> = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal ref={modal} trigger="open-tutorial-modal">
      <IonContent>
        <IonSlides style={{ height: "100vh", color: "white" }} pager={true} options={slideOpts}>
          <IonSlide>
            <div className="slide__container">
              <div className="slide__body">
                <img src="./assets/tutorial/player.png" alt="" />
                <IonText>This is you</IonText>
                <IonText>Each turn you can move one step to the nearest tile</IonText>

              </div>
              <div className="slide__body">
                <img src="./assets/tutorial/exit.png" alt="" />
                <IonText>This is the exit</IonText>
                <IonText>Your goal cross the map with the lowest amount of steps</IonText>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
          <div className="slide__container">
              <div className="slide__body">
                <img src="./assets/tutorial/enemy.png" alt="" />
                <IonText>This is your enemy</IonText>
                <IonText>The enemy will move after your turn</IonText>

              </div>
              <div className="slide__body">
                <img src="./assets/tutorial/lost.png" alt="" />
                <IonText>This lose situation</IonText>
                <IonText>You can't be found on a matched tile to him</IonText>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
          <div className="slide__container">
              <div className="slide__body">
                <img src="./assets/tutorial/colider.png" alt="" />
                <IonText>Not All Moves Are Valid</IonText>
                <IonText>Tiles that contains obstacles are not valid move</IonText>

              </div>
              <div className="slide__body">
                <img src="./assets/tutorial/buttons.png" alt="" />
                <IonText>Those are the controls</IonText>
                <IonText>In any point of the game you can ask for hint or quit the game</IonText>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
          <div className="slide__last">
            <IonText>Good Luck And Have Fun!</IonText>
            <IonButton onClick={()=>modal.current?.dismiss()}>Finish</IonButton>
          </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonModal>
  );
};

export default Tutorial;
