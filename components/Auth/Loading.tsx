/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactLoading from 'react-loading';

const Loading = (className: any): JSX.Element => {
  return (
    <div
      className={`h-screen w-screen flex justify-center items-center ${className}`}
    >
      <ReactLoading type="cylon" color="#0c3a5c" height={667} width={375} />
    </div>
  );
};

export default Loading;
