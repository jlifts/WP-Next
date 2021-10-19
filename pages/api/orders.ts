/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Square payments api
import { squareClient } from 'lib/SquareClient';
import {
  ApiError,
  CreateOrderRequest,
  Money,
  OrderLineItemDiscount,
} from 'square';
import { OrderLineItem } from 'square/dist/models/orderLineItem';
import { v4 as uuidv4 } from 'uuid';
import JSONBig from 'json-bigint';

const idempotencyKey = uuidv4();

const { ordersApi } = squareClient;

// For updating the codeuse big int literal n, but since it is targeting lower than 2020 use BIgInt()
export const handler = async (
  req: { body: { lineItem?: any; discountName?: any; discount?: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: any): { (): any; new (): any; end: { (): void; new (): any } };
        new (): any;
      };
    };
    json: (arg0: any) => {
      (): any;
      new (): any;
      end: { (): void; new (): any };
    };
  },
) => {
  const lineItems: OrderLineItem[] = [];
  const discounts: OrderLineItemDiscount[] = [];
  const products = req.body.lineItem;
  // req.body.lineItem.map((item: { name: any }) => ({ name: item.name }));
  // req.body.lineItem.map(
  //   (item: { amount: string | number | bigint | boolean }) => ({
  //     amount: item.amount,
  //   }),
  // );
  // req.body.lineItem.map((item: { quantity: any }) => ({
  //   quantity: item.quantity,
  // }));
  const { discountName } = req.body;
  const { discount } = req.body;

  const reqBodyDiscount: OrderLineItemDiscount = {
    name: discountName,
    amountMoney: {
      amount: BigInt(discount),
      currency: 'USD',
    },
  };

  products.forEach(
    (item: {
      amount: string | number | bigint | boolean;
      name: any;
      quantity: any;
    }) => {
      const reqBodyMoney: Money = {
        amount: BigInt(item.amount),
        currency: 'USD',
      };
      // $2.00 in cents 200

      const reqBodyItem: OrderLineItem = {
        basePriceMoney: reqBodyMoney,
        name: item.name,
        quantity: item.quantity,
        uid: uuidv4(),
        // catalogObjectId: '1643',
      };
      lineItems.push(reqBodyItem);
    },
  );
  discounts.push(reqBodyDiscount);

  // Retrieve order Id from woo, and source ID from Web Payments SDK, customerID
  const body: CreateOrderRequest = {
    idempotencyKey,
    order: {
      state: 'OPEN',
      locationId: '3R5GR5D9RKG4Z', //  L1MBBAVEE0STC 3R5GR5D9RKG4Z
      lineItems,
      discounts,
    },
  };
  // If we save cards on file with create customer API
  // body.order.customerId = '';
  // Refrence the orderID created in square
  // body.orderId = '';
  // Woo-comerce orderID

  try {
    const { result } = await ordersApi.createOrder(body);
    res
      .status(200)
      .json(JSONBig.parse(JSONBig.stringify(result)))
      .end();
    // console.log(result);
  } catch (error) {
    if (error instanceof ApiError) {
      // console.error(error);
      const errors = error.result;
      res.json(errors).end();
      // const { statusCode } = error;
      // console.log(statusCode);
    }
    // res.status(200).end();
  }
};
//   return new Promise<void>((resolve, reject) => {
//     ordersApi
//       .createOrder(body)
//       .then((response) => {
//         res.status = 200;
//         res.end(JSONBig.parse(JSONBig.stringify(response)));
//         resolve();
//       })
//       .catch((error) => {
//         res.json(error);
//         res.end((res.status = 405));
//         return resolve(); // in case something goes wrong in the catch block (as vijay) commented
//       });
//   });
// };

export default handler;
