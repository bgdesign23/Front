import React, { useState } from "react";
import Styles from "../../Components/Rating/Rating.module.css";
import { AiFillStar } from "react-icons/ai";

export default function Rating() {
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleStarHover = (starIndex) => {
    setHoveredStars(starIndex);
  };

  return (
    <div className={Styles.containerStars}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <AiFillStar
          key={starIndex}
          className={`${Styles.star} ${
            starIndex <= hoveredStars ? Styles.starHovered : ""
          }`}
          onMouseEnter={() => handleStarHover(starIndex)}
          onMouseLeave={() => handleStarHover(0)}
        />
      ))}
    </div>
  );
}
