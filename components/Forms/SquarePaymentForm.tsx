/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
// import {
//   SquarePaymentsForm,
//   CreditCardInput,
//   GooglePay,
// } from 'react-square-web-payments-sdk';

const SquarePayments = (): any => {
  const LID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_LID;
  const APP_ID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_ID;

  return (
    <>
      <div className="flex">
        <span className="flex items-center border-b text-gray-500" />
        <p className="flex items-center px-3 text-gray-500">or</p>
        <span className="flex items-center border-b text-gray-500" />
      </div>
    </>
    // Notice Next Config for details of below
    // <SquarePaymentsForm
    //   /**
    //    * Identifies the calling form with a verified application ID
    //    * generated from the Square Application Dashboard.
    //    */
    //   applicationId={APP_ID}
    //   /**
    //    * Invoked when payment form receives the result of a tokenize generation request.
    //    * The result will be a valid credit card or wallet token, or an error.
    //    */
    //   cardTokenizeResponseReceived={(token: any, buyer: any) => {
    //     console.info({ token, buyer });
    //   }}
    //   /**
    //    * This function enable the Strong Customer Authentication (SCA) flow
    //    *
    //    * We strongly recommend use this function to verify the buyer and
    //    * reduce the chance of fraudulent transactions.
    //    */
    //   createVerificationDetails={() => ({
    //     amount: '1.00',
    //     /* collected from the buyer */
    //     billingContact: {
    //       addressLines: ['123 Main Street', 'Apartment 1'],
    //       familyName: 'Doe',
    //       givenName: 'John',
    //       countryCode: 'GB',
    //       city: 'London',
    //     },
    //     currencyCode: 'USD',
    //     intent: 'CHARGE',
    //   })}
    //   /**
    //    * Identifies the location of the merchant that is taking the payment.
    //    * Obtained from the Square Application Dashboard - Locations tab.
    //    */
    //   locationId={LID}
    // >
    //   <CreditCardInput />
    //   <div className="flex">
    //     <span className="flex items-center border-b text-gray-500" />
    //     <p className="flex items-center px-3 text-gray-500">or</p>
    //     <span className="flex items-center border-b text-gray-500" />
    //   </div>
    //   <GooglePay />
    // </SquarePaymentsForm>
  );
};

export default SquarePayments;
