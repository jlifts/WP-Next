/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

interface IOrder {
  orderNumber: number;
  status: string;
  date: string | number;
  total: string | number;
}

const Order = ({ orderNumber, status, date, total }: IOrder): JSX.Element => {
  const newDate = new Date(date);
  const year: number | string = newDate.getFullYear();
  let month: number | string = newDate.getMonth() + 1;
  let day: number | string = newDate.getDate();

  if (day < 10) {
    day.toString();
    day = `0${day}`;
  }

  if (month < 10) {
    month.toString();
    month = `0${month}`;
  }

  return (
    <div className="bg-white text-black shadow-xl mx-2 px-8 py-5 w-full">
      <div className="flex w-full items-start">
        <p className="flex justify-start w-full">Order #: {orderNumber}</p>
        <p className="flex justify-end w-full">
          {year} - {month} - {day}
        </p>
      </div>
      <div className="flex w-full items-end mt-8">
        <p className="flex justify-start w-full">{total}</p>
        <p
          className={`flex justify-end w-full ${
            status === 'COMPLETED' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default Order;
