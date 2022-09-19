import {
  IonAlert,
  IonButton,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { SetStateAction, useRef, useState } from "react";
import {
  updateUserAvatar,
  updateUserNickname,
} from "../../../Database/database";
import { TOAST_DURATION } from "../../../utils/constants";
import { useUserContext } from "../../context/UserContext";

type Props = {
  isProfileModal : boolean
  setIsProfileModal: React.Dispatch<SetStateAction<boolean>>
};

const ProfileModal: React.FC<Props> = ({isProfileModal,setIsProfileModal}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { currentUser, setCurrentUser, avatars } = useUserContext();
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [avatar, setAvatar] = useState({
    code: currentUser.avatarCode,
    url: currentUser.avatarUrl,
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    header: "Error...",
    subHeader: "",
    message:
      "We had some trouble updating your data.\n Please check your internet connection and try again.",
    buttons: ["OK"],
  });
  const [present] = useIonToast();

  const listOfAvatars =
    currentUser.gender === 1 ? avatars[0].options : avatars[1].options;
  const avatarsThumbnails = listOfAvatars.map((image) => {
    return (
      <IonThumbnail key={image.code} onClick={() => setAvatar(image)}>
        <img data-code={image.code} src={image.url} alt="" />
      </IonThumbnail>
    );
  });

  const saveProfile = async () => {
    setIsBtnDisabled(true)
    if (!nickname) {
      present({
        duration: TOAST_DURATION,
        message: "Nickname Cannot Be Empty!",
      });
      setIsBtnDisabled(false)
      return;
    }
    if (!/^[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{3,15}$/.test(nickname)) {
      present({
        duration: TOAST_DURATION,
        message: "Nickname Can Contain English Letters, Numbers,Special Characters Between 3-15",
      });
      setIsBtnDisabled(false)
      return;
    }
    if (
      nickname === currentUser.nickname &&
      avatar.code === currentUser.avatarCode
    ) {
      modal.current?.dismiss();
      return;
    }
    let nicknameResponse = true;
    let avatarResponse = true;
    if (nickname !== currentUser.nickname) {
      nicknameResponse = await updateUserNickname(currentUser._id, currentUser.token,{
        nickName: nickname,
      });
    }
    if (avatar.code !== currentUser.avatarCode) {
      avatarResponse = await updateUserAvatar(currentUser._id,currentUser.token, {
        avatarCode: avatar.code,
        avatarUrl: avatar.url,
      });
    }
    if (avatarResponse && nicknameResponse) {
      setCurrentUser({
        ...currentUser,
        nickname,
        avatarCode: avatar.code,
        avatarUrl: avatar.url,
      });
      present({
        duration: TOAST_DURATION,
        message: "Your Profile Updated Succsussfuly",
      });
      modal.current?.dismiss();
    } else {
      setShowAlert({ ...showAlert, isOpen: true });
      setIsBtnDisabled(false)
    }
  };

  return (
    <IonModal
      id="profile-modal"
      ref={modal}
      isOpen={isProfileModal}
      onDidDismiss={() => {
        setAvatar({
          code: currentUser.avatarCode,
          url: currentUser.avatarUrl,
        });
        setNickname(currentUser.nickname);
        setIsBtnDisabled(false)
        setIsProfileModal(false)
      }}
    >
      <IonAlert
        isOpen={showAlert.isOpen}
        onDidDismiss={() => setShowAlert({ ...showAlert, isOpen: false })}
        header={showAlert.header}
        subHeader={showAlert.subHeader}
        message={showAlert.message}
        buttons={showAlert.buttons}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="profile-modal__body">
        <div className="image__wrapper">
          <img data-code={avatar.code} src={avatar.url} alt="avatar" />
        </div>
        <div className="thumbnails">{avatarsThumbnails}</div>
        <IonItem lines={"none"}>
          <IonInput
            color={"white"}
            placeholder="Nickname"
            value={nickname}
            maxlength={15}
            onIonChange={(e) => setNickname(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <div>
          <IonButton
            fill="outline"
            style={{ color: "white" }}
            onClick={() => modal.current?.dismiss()}
          >
            Cancel
          </IonButton>
          <IonButton 
          color="primary" 
          onClick={saveProfile}
          disabled={isBtnDisabled}>
            Save
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ProfileModal;
