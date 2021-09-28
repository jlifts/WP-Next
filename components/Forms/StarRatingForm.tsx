/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, onRating }: any): JSX.Element => {
  const [hover, setHover] = useState(0);

  const ratingComponenet = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className={`cursor-pointer ${
            hover >= idx
              ? 'text-primary'
              : !hover && rating >= idx
              ? 'text-primary'
              : 'text-gray-400'
          }`}
          icon={faStar}
          onClick={() => onRating(idx)}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(0)}
        />
      ));
  }, [hover, onRating, rating]);

  return <div>{ratingComponenet}</div>;
};

export default StarRating;
