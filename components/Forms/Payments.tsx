import React, { useState } from 'react';

type PaymentFormData = {
  cardName: string;
  cardNum: number;
  CCV: number;
};

const PaymentForm = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return <div>Hi</div>;
};

export default PaymentForm;
