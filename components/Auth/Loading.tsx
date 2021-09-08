import React from 'react';
import ReactLoading from 'react-loading';

const Loading = (): JSX.Element => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ReactLoading type="cylon" color="#0c3a5c" height={667} width={375} />
    </div>
  );
};

export default Loading;
