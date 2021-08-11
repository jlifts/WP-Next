/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Heading, { HeadingProps } from './Heading';

interface Props {
  headingLevel?: HeadingProps['level'];
  title?: string;
  subTitle?: string;
  body?: string;
  body2?: string;
  body3?: string;
  body4?: string;
  id?: string;
}

const PopOut = ({
  title,
  subTitle,
  headingLevel = 'h3',
  body,
  body2,
  body3,
  body4,
  id,
}: Props): JSX.Element => {
  return (
    <div
      {...(id && { id })}
      className="flex flex-col text-gray bg-white shadow-xl p-8"
    >
      <div className="flex flex-col justify-center items-center py-8">
        <Heading className="uppercase font-rale text-lg" level={headingLevel}>
          {title}
        </Heading>
        <Heading
          className="uppercase font-cochin text-3xl"
          level={headingLevel}
        >
          {subTitle}
        </Heading>
      </div>
      <div className="space-y-4">
        <p>{body}</p>
        <p>{body2}</p>
        <p>{body3}</p>
        <p>{body4}</p>
      </div>
    </div>
  );
};

export default PopOut;
