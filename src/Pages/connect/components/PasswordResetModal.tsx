//מודל עוטף לדף איפוס סיסמא
import {
  IonButton,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonSpinner,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { resetPassword } from "../../../Database/database";
import { TOAST_DURATION } from "../../../utils/Constants";

type Props = {
  isResetModal: boolean;
  setIsResetModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordResetModal: React.FC<Props> = ({ isResetModal, setIsResetModal }) => {
  const [present] = useIonToast();
  const modal = useRef<HTMLIonModalElement>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordHandler = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email) {
      present({ duration: TOAST_DURATION, message: "Email cannot be empty" });
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      present({ duration: TOAST_DURATION, message: "Wrong email format" });
      return;
    }
    try {
      const response = await resetPassword(email);
      if (!response) {
        present({ duration: TOAST_DURATION, message: "User does not exists" });
        return;
      }
      present({
        duration: TOAST_DURATION,
        message: "Password reset link sent to your email account",
      });
    } catch {
      present({ duration: TOAST_DURATION, message: "An error occurd, try again later..." });
    }
    setIsLoading(false);
    setIsResetModal(false);
  };
  return (
    <IonModal
      isOpen={isResetModal}
      id="reset-password-modal"
      ref={modal}
      onDidDismiss={() => setIsResetModal(false)}
      // trigger="open-reset-password-modal"
    >
      <IonHeader>
        <IonToolbar>
          <span>Reset Password</span>
        </IonToolbar>
      </IonHeader>
      <div className="reset-modal__container">
        <form onSubmit={resetPasswordHandler}>
          <IonItem lines={"none"}>
            <IonInput
              onIonChange={(e) => setEmail(e.detail.value!)}
              color={"white"}
              placeholder="Email"
              autocomplete="email"
              type="email"
            ></IonInput>
          </IonItem>
          <IonButton strong={true} color="primary" type="submit" disabled={isLoading}>
            {isLoading && (
              <IonSpinner color={"warning"} name="bubbles" style={{ position: "absolute" }} />
            )}
            Reset Password
          </IonButton>
        </form>
      </div>
    </IonModal>
  );
};

export default PasswordResetModal;
