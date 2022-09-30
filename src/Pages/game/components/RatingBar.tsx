//קומפוננטה אשר עולה במודל הניצחון כאשר ניצחנו-דירוג מ1-5 של פופולריות שלב
import { IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";
import React, { SetStateAction } from "react";

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
    </div>
  );
};

export default RatingBar;
