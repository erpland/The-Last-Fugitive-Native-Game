import {
  IonButton,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import {
  updateUserAvatar,
  updateUserNickname,
} from "../../../Database/database";
import { AvatarOptionsType } from "../../../Types/userTypes";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const ProfileModal: React.FC = (props: Props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { currentUser, setCurrentUser, avatars } = useUserContext();
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [avatar, setAvatar] = useState({
    code: currentUser.avatarCode,
    url: currentUser.avatarUrl,
  });

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
    if (nickname !== currentUser.nickname) {
      await updateUserNickname(currentUser._id, {
        nickName: nickname,
      });
    }
    if (avatar.code !== currentUser.avatarCode) {
      await updateUserAvatar(currentUser._id, {
        avatarCode: avatar.code,
        avatarUrl: avatar.url,
      });
    }
    setCurrentUser({
      ...currentUser,
      nickname,
      avatarCode: avatar.code,
      avatarUrl: avatar.url,
    });
    modal.current?.dismiss();
  };

  return (
    <IonModal
      id="profile-modal"
      ref={modal}
      trigger="open-profile-modal"
      onDidDismiss={() =>
        setAvatar({
          code: currentUser.avatarCode,
          url: currentUser.avatarUrl,
        })
      }
    >
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
          <IonButton color="primary" onClick={saveProfile}>
            Save
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ProfileModal;
