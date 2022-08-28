import { IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useState } from "react";

type Props = {};

const RatingBar: React.FC = (props: Props) => {
  const [rating, setRating] = useState(0);

  const stars = new Array(5).fill(null).map((a) => {
    return <IonIcon style={{ padding: "10px" }} size="large" icon={star} />;
  });
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
