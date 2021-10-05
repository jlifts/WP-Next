/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

// import {
//   SquarePaymentsForm,
//   CreditCardInput,
//   GooglePay,
// } from 'react-square-web-payments-sdk';

// Dynamically load the payment script
// export const loadSquareSdk = () => {
//   return new Promise<void>((resolve, reject) => {
//     const sqPaymentScript = document.createElement('script');
//     sqPaymentScript.src = 'https://js.squareup.com/v2/paymentform';
//     sqPaymentScript.crossOrigin = 'anonymous';
//     sqPaymentScript.onload = () => {
//       resolve();
//     };
//     sqPaymentScript.onerror = () => {
//       reject(`Failed to load ${sqPaymentScript.src}`);
//     };
//     document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
//   });
// };

const SquarePayments = (): any => {
  const LID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_LID;
  const APP_ID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_ID;

  // SQUARE DOCS

  // async function initializeCard(payments: any) {
  //   const card = await payments.card();
  //   await card.attach('#card-container');

  //   return card;
  // }

  // async function createPayment(token: any) {
  //   const body = JSON.stringify({
  //     LID,
  //     sourceId: token,
  //   });

  //   const paymentResponse = await fetch('/payment', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body,
  //   });

  //   if (paymentResponse.ok) {
  //     return paymentResponse.json();
  //   }

  //   const errorBody = await paymentResponse.text();
  //   throw new Error(errorBody);
  // }

  // async function tokenize(paymentMethod: any) {
  //   const tokenResult = await paymentMethod.tokenize();
  //   if (tokenResult.status === 'OK') {
  //     return tokenResult.token;
  //   }
  //   let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
  //   if (tokenResult.errors) {
  //     errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
  //   }
  //   throw new Error(errorMessage);
  // }

  // // Status is either Success or Failure
  // function displayPaymentResults(status: any) {
  //   const statusContainer = document.getElementById('paymetn-status-container');
  //   if (status === 'SUCCESSS') {
  //     statusContainer.classList.remove('is-failure');
  //     statusContainer.classList.add('is-success');
  //   } else {
  //     statusContainer.classList.remove('is-success');
  //     statusContainer.classList.add('is-failure');
  //   }
  //   statusContainer.style.visibility = 'visible';
  // }

  // document.addEventListener('DOMContentLoaded', async function () {
  //   if (!window.Square) {
  //     throw new Error('Square.js failed to load properly');
  //   }

  //   let payments;
  //   try {
  //     payments = window.Square.payments(APP_ID, LID);
  //   } catch {
  //     const statusContainer = document.getElementById(
  //       'payment-status-container',
  //     );
  //     statusContainer.className = 'missing-credentials';
  //     statusContainer.style.visibility = 'visible';
  //     return;
  //   }

  //   let card;
  //   try {
  //     card = await initializeCard(payments);
  //   } catch (e) {
  //     console.error('Initializing Card failed', e);
  //     return;
  //   }

  //   async function handlePaymentMethodSubmission(event, paymentMethod) {
  //     event.preventDefault();

  //     try {
  //       cardButton.disabled = true;
  //       const token = await tokenize(paymentMethod);
  //       const paymentResults = await createPayment(token);
  //       displayPaymentResults('SUCCESS');
  //     } catch (e) {
  //       cardButton.disabled = false;
  //       displayPaymentResults('FAILURE');
  //       console.error(e.message);
  //     }
  //   }

  //   const cardButton = document.getElementById('card-button');
  //   cardButton.addEventListener('click', async function (event) {
  //     await handlePaymentMethodSubmission(event, card);
  //   });
  // });

  // SQUARE DOCS END

  // GATSBY DOCS

  return (
    <>
      <div className="flex justify-center items-center">
        <span className="flex items-center border-b text-gray-500 w-1/2" />
        <p className="flex px-3 text-gray-500">or</p>
        <span className="flex items-center border-b text-gray-500 w-1/2" />
      </div>
      <div id="card-container" />
      <button id="card-button" type="button">
        Pay $1.00
      </button>
      <div id="payment-status-container" />
    </>

    // SQUARE PAYMENT FORM SDK, DID NOT WORK WITH NEXT, IS BETA

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

    // SQUARE PAYMENT FORM SDK END
  );
};

export default SquarePayments;
