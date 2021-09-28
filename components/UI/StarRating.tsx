/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IStarRating {
  rating: number;
  className: string;
}

const StarRating = ({ rating, className }: IStarRating): JSX.Element => {
  const ratingRoundedPercentage = `${
    Math.round(((rating / 5) * 100) / 10) * 10
  }%`;
  //   console.log(ratingRoundedPercentage);

  return (
    // Attempt with React only
    // <div>
    //   {[...Array(5)].map((star) => {
    //     return (
    //       <React.Fragment key={Math.random()}>
    //         <FontAwesomeIcon
    //           className={`${className} stars-outer text-gray-500`}
    //           icon={faStar}
    //         />
    //         <FontAwesomeIcon
    //           className="stars-inner text-primary"
    //           icon={faStar}
    //           style={{ width: ratingRoundedPercentage }}
    //         />
    //       </React.Fragment>
    //     );
    //   })}
    // </div>
    // return (
    <div className={`${className} stars-outer`}>
      <div className="stars-inner" style={{ width: ratingRoundedPercentage }} />
    </div>
  );
};

export default StarRating;
