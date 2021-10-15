/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable func-names */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-promise-reject-errors */
// import { useMutation } from '@apollo/client';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loading } from 'components';
import { CartContext } from 'Context/CartContext';
// import { UPDATE_ORDER } from 'graphql/Mutations';
import router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

declare let Square: any;

// Dynamically load the payment script

const SquarePayments = ({ orderId, wooId }: any) => {
  const [cart] = useContext(CartContext);
  const LID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_LID;
  const APP_ID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_ID;
  const [loading, setLoading] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fail, setFail] = useState(false);
  // const [updateOrder] = useMutation(UPDATE_ORDER, {
  //   variables: { orderId: wooId },
  // });

  // SQUARE DOCS

  useEffect(() => {
    async function main() {
      // Initializes Square SDK
      const payments = Square.payments(APP_ID, LID);
      const card = await payments.card();
      // const googlePay = await payments.googlePay();
      setLoading(true);
      await card.attach('#card-container');
      // await googlePay.attach('#google-pay-button');
      setLoading(false);

      // Token Creation
      async function tokenize(paymentMethod: any) {
        const result = await paymentMethod.tokenize();
        if (result.status === 'OK') {
          // console.log(`Payment token is ${result.token}`);
          return result.token;
        }
        let errorMessage = `Tokenization failed-status: ${result.status}`;
        if (result.errors) {
          errorMessage += ` and errors: ${JSON.stringify(result.errors)}`;
        }
        throw new Error(errorMessage);
      }
      // Sends token to backend
      async function createPayment(token: any) {
        const amount = cart.totalProductsPrice
          .replace('$', '')
          .replace('.', '');
        const body = JSON.stringify({
          token,
          orderId,
          amount,
          referenceId: wooId,
        });

        const paymentResponse = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        if (paymentResponse.ok) {
          return paymentResponse.json();
        }

        const errorBody = await paymentResponse.text();
        throw new Error(errorBody);
      }

      // Payment Status Helper
      function displayPaymentResults(status: any) {
        const statusContainer = document.getElementById(
          'payment-status-container',
        );
        if (status === 'SUCCESS') {
          statusContainer.classList.remove('is-failure');
          statusContainer.classList.add('is-success');
        } else {
          statusContainer.classList.remove('is-success');
          statusContainer.classList.add('is-failure');
          setFail(true);
        }

        statusContainer.style.visibility = 'visible';
      }

      // Payment method handler
      async function handlePaymentMethodSubmission(
        event: { preventDefault: () => void },
        paymentMethod: any,
      ) {
        event.preventDefault();

        try {
          // disable the submit button as we await tokenization and make a
          // payment request.
          setDisabled(true);
          const token = await tokenize(paymentMethod);
          const paymentResults = await createPayment(token);
          displayPaymentResults('SUCCESS');

          console.debug('Payment Success', paymentResults);
          // void updateOrder();

          // setTimeout(() => {
          //   router.push(`/checkout/orderDetails/${wooId}`);
          // }, 5000);
          void setTimeout(() => {
            router.push(`/checkout/thankyou`);
            setLoadingRedirect(true);
          }, 5000);
        } catch (e) {
          setDisabled(false);
          displayPaymentResults('FAILURE');
          console.error(e);
        }
      }

      // Event listener
      const cardButton = document.getElementById('card-button');
      cardButton.addEventListener('click', async function (event) {
        await handlePaymentMethodSubmission(event, card);
      });

      // if (googlePay) {
      //   const googlePayButton = document.getElementById('google-pay-button');
      //   googlePayButton.addEventListener('click', async function (event) {
      //     await handlePaymentMethodSubmission(event, googlePay);
      //   });
      // }
    }
    void main();
  }, [APP_ID, LID]); // TEST THIS

  // SQUARE DOCS END

  // FOR TESTING

  // async function createPayment(token: any) {
  //   const amount = cart.totalProductsPrice.replace('$', '').replace('.', '');
  //   const body = JSON.stringify({
  //     token,
  //     orderId: orderId.orderId,
  //     amount,
  //   });

  //   const paymentResponse = await fetch('/api/payments', {
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
  // console.log(orderId.orderId);

  return (
    <>
      {loading && <Loading />}
      <form id="payment-form">
        {/* When GPay can be enabled */}
        {/* <div id="google-pay-button"></div>

        <div className="flex justify-center items-center">
          <span className="flex items-center border-b text-gray-500 w-1/2" />
          <p className="flex px-3 text-gray-500">or</p>
          <span className="flex items-center border-b text-gray-500 w-1/2" />
        </div> */}
        <div id="card-container"></div>
        <button
          // onClick={(event) => handlePaymentMethodSubmission(event, card)}
          id="card-button"
          className={`${
            disabled || loading
              ? 'cursor-default bg-gray-600 text-gray-200'
              : 'bg-black text-white hover:bg-white hover:text-black hover:border-black'
          } flex justify-center w-60 sm:w-300 md:w-full rounded-lg py-3 border-white border`}
          type="button"
          disabled={disabled || loading}
        >
          <FontAwesomeIcon icon={faLock} className="mr-2 mt-1" /> Pay{' '}
          {cart.totalProductsPrice}
        </button>
      </form>
      <div id="payment-status-container" />
      {loadingRedirect && <p>Redirecting...</p>}
      {fail && <p>If status failed try pressing again!</p>}
    </>
  );
};
export default SquarePayments;
