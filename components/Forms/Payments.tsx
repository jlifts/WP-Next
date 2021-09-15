import React, { useState } from 'react';

type PaymentFormData = {
  cardName: string;
  cardNum: number;
  CCV: number;
};

const PaymentForm = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center h-4/5">
      <div className="flex justify-center"></div>
    </div>
  );
};

export default PaymentForm;

// TODO: add react-square-web-payments-sdk for google pay and card
