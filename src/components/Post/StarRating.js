import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import styled, { css } from "styled-components";

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StarRow = styled.div`
  display: flex;
  align-items: center;
`;

const StarDiv = styled.div`
  position: relative;
  cursor: pointer;
  margin-top: 3px;
  transition: all 0.2s ease-in-out;
`;

const StarIcon = styled(({ filled, halfFilled, ...props }) => (
  <div {...props}>
    {props.filled ? <FaStar size={18} /> : <FaStar size={18} />}
  </div>
))`
  /* color: ${(props) =>
    props.filled || props.halfFilled ? props.color : "lightGray"}; */
`;

const Left = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
`;

const Right = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
`;

function StarRating({ rating, onStarClick }) {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleLeftHalfEnter = (idx) => setHoveredRating(idx + 0.5);
  const handleRightHalfEnter = (idx) => setHoveredRating(idx + 1);
  const handleStarClick = (idx) => {
    if (hoveredRating !== null) {
      onStarClick(hoveredRating);
    } else {
      onStarClick(idx + 1);
    }
  };

  return (
    <StarContainer>
      <StarRow>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const starIndex = idx + 1;
            const isFilled =
              starIndex <= (hoveredRating !== null ? hoveredRating : rating);
            const isHalfFilled =
              hoveredRating === null &&
              starIndex === Math.ceil(rating) &&
              rating % 1 !== 0;

            return (
              <StarDiv
                key={idx}
                onClick={() => handleStarClick(idx)}
                style={{
                  transform: `scale(${isFilled ? 1 : 0.5})`,
                }}
              >
                <StarIcon
                  filled={isFilled}
                  halfFilled={isHalfFilled}
                  color={"red"}
                />
                <Left
                  key={idx + "left"}
                  onMouseEnter={() => handleLeftHalfEnter(idx)}
                />
                <Right
                  key={idx + "right"}
                  onMouseEnter={() => handleRightHalfEnter(idx)}
                />
              </StarDiv>
            );
          })}
      </StarRow>
    </StarContainer>
  );
}

export default StarRating;
