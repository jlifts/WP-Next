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
  req: { body: { lineItem: any[]; discountName: string; discount: number } },
  res: {
    json: (arg0: any) => void;
    status: (arg0: unknown) => {
      (): any;
      new (): any;
      end: { (): void; new (): any };
      json: { (arg0: {}): void; new (): any };
    };
  },
) => {
  const lineItems: OrderLineItem[] = [];
  const discounts: OrderLineItemDiscount[] = [];
  const products = req.body.lineItem;
  req.body.lineItem.map((item: { name: any }) => ({ name: item.name }));
  req.body.lineItem.map(
    (item: { amount: string | number | bigint | boolean }) => ({
      amount: item.amount,
    }),
  );
  req.body.lineItem.map((item: { quantity: any }) => ({
    quantity: item.quantity,
  }));
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
      locationId: 'L1MBBAVEE0STC',
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
    res.json(JSONBig.parse(JSONBig.stringify(result)));
    res.status(200).end();
    // console.log(result);
  } catch (error) {
    if (error instanceof ApiError) {
      const errors = error.result;
      res.json(errors);
      const { statusCode } = error;
      console.log(statusCode);
    }
    res.status(error).json({});
  }
};

export default handler;
