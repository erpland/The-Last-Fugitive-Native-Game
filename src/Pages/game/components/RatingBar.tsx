import { IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";
import React, { SetStateAction, useState } from "react";

type Props = {
  rating:number
  setRating: React.Dispatch<SetStateAction<number>>
};

const RatingBar: React.FC<Props> = ({rating,setRating}) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding:10,
        flexDirection: "column",
      }}
    >
      <span>Level Rating</span>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {[...Array(5)].map((el, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i} style={{padding:'5px'}}>
              <input
                type="radio"
                name="rating"
                style={{ display: "none" }}
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <IonIcon
                color={ratingValue <= rating ? "warning" : ""}
                icon={star}
              />
            </label>
          );
        })}
      </div>
      {/* {rating !== 0 && (
        <small style={{ color: "white" }} onClick={() => setRating(0)}>
          Reset
        </small>
      )} */}
    </div>
  );
};

export default RatingBar;
