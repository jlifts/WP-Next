/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { v4 } from 'uuid';
// TODO: in the future grab preferred states from woo
// import GET_STATES from '../queries/get-states';

// TS Functions for PWA syncronous offline handling
export const getFloat = (string: string | any) => {
  const floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
  return floatValue !== null
    ? parseFloat(parseFloat(floatValue).toFixed(2))
    : '';
};

// Creates new product object
export const createNewProduct = (
  product: any,
  productPrice: any,
  qty: number,
) => {
  return {
    productId: product.productId,
    id: product.id,
    image: product.featuredImage.node.sourceUrl,
    name: product.name,
    price: productPrice,
    qty,
    totalPrice: parseFloat((productPrice * qty).toFixed(2)),
  };
};

export const addFirstProduct = (product: any) => {
  const productPrice = getFloat(product.regularPrice);

  const products: any[] = [];

  const newCart = {
    products,
    totalCount: 1,
    totalPrice: productPrice,
  };

  const newProduct = createNewProduct(product, productPrice, 1);
  newCart.products.push(newProduct);

  localStorage.setItem('woo-cart', JSON.stringify(newCart));
  return newCart;
};

// This returns the idex of the product if it exists
export const isProductInCart = (
  existingProductsInCart: any,
  productId: string,
) => {
  const returnItemThatExists = (item: any, _index: number) => {
    if (productId === item.id) {
      return item;
    }
    return null;
  };

  const newArray = existingProductsInCart.filter(returnItemThatExists);

  return existingProductsInCart.indexOf(newArray[0]);
};

// Get updated Products array, update the product if it exists, and add a new product to the existing product array
export const getUpdatedProducts = (
  existingProductsInCart: any,
  product: any,
  qtyToBeAdded: number,
  newQty: any = false,
) => {
  const productExistsIndex = isProductInCart(
    existingProductsInCart,
    product.id,
  );
  // If the product exists, update product qty and total price
  if (productExistsIndex > -1) {
    const updatedProducts: any = existingProductsInCart;
    const updatedProduct: any = updatedProducts[productExistsIndex];

    // If there is a new qty available add that else add qty to be added
    updatedProduct.qty = newQty
      ? parseInt(newQty, 10)
      : parseInt(updatedProduct.qty + qtyToBeAdded, 10);
    updatedProduct.totalPrice = parseFloat(
      (updatedProduct.price * updatedProduct.qty).toFixed(2),
    );

    return updatedProducts;
  }
  // The product is not in the cart yet, this pushes it to the array
  const productPrice = getFloat(product.regularPrice);
  const newProduct = createNewProduct(product, productPrice, qtyToBeAdded);
  existingProductsInCart.push(newProduct);

  return existingProductsInCart;
};

export const updateCart = (
  exists: any,
  product: any,
  qtyToBeAdded: any,
  newQty: any = false,
) => {
  const updatedProducts = getUpdatedProducts(
    exists.products,
    product,
    qtyToBeAdded,
    newQty,
  );
  const addPrice = (total: any, item: any) => {
    total.totalPrice += item.totalPrice;
    total.qty += item.qty;

    return total;
  };

  // loop through updated product array and add total price of items for total price of cart and qty
  const total = updatedProducts.reduce(addPrice, {
    totalPrice: 0,
    qty: 0,
  });

  const updatedCart = {
    products: updatedProducts,
    totalCount: parseInt(total.qty, 10),
    totalPrice: parseFloat(total.totalPrice),
  };

  localStorage.setItem('woo-cart', JSON.stringify(updatedCart));

  return updatedCart;
};

export const removeItemFromCart = (productId: any): any => {
  // Get existing cart data
  let existingCart: any = localStorage.getItem('woo-cart');
  existingCart = JSON.parse(existingCart);

  // If there is one Item, delete cart
  if (existingCart.products.length === 1) {
    localStorage.removeItem('woo-cart');
    return null;
  }

  // Array for exisitng products
  const productExistsIndex = isProductInCart(existingCart.products, productId);

  if (productExistsIndex > -1) {
    const productToBeRemoved = existingCart.products[productExistsIndex];
    const qtyToBeRemoved = productToBeRemoved.qty;
    const priceToBeDeducted = productToBeRemoved.totalPrice;

    // Begin removal and update cart totals
    const updatedCart = existingCart;
    updatedCart.products.splice(productExistsIndex, 1);
    updatedCart.totalCount -= qtyToBeRemoved;
    updatedCart.totalPrice -= priceToBeDeducted;

    localStorage.setItem('woo-cart', JSON.stringify(updatedCart));
    return updatedCart;
  }
  return existingCart;
};

// END

export const getFormattedCart = (data: any) => {
  let formattedCart: any = null;

  if (undefined === data || !data.cart.contents.nodes.length) {
    return formattedCart;
  }

  const givenProducts = data.cart.contents.nodes;

  // Create an empty object.
  formattedCart = {};
  formattedCart.products = [];
  let totalProductsCount = 0;

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts?.[i]?.product?.node;
    const product: any = {};
    const total: any = getFloat(givenProducts[i].subtotal);

    product.productId = givenProduct?.productId ?? '';
    product.cartKey = givenProducts?.[i]?.key ?? '';
    product.name = givenProduct?.name ?? '';
    product.qty = givenProducts?.[i]?.quantity;
    product.regularPrice = total / product?.qty;
    product.subtotalPrice = givenProducts?.[i]?.subtotal ?? '';
    product.totalPrice = givenProducts?.[i]?.total ?? '';
    product.image = {
      sourceUrl: givenProduct?.featuredImage?.node?.sourceUrl ?? '',
      srcSet: givenProduct?.featuredImage?.node?.srcSet ?? '',
      title: givenProduct?.featuredImage?.node?.title ?? '',
      altText: givenProduct?.featuredImage?.node?.altText ?? '',
    };

    totalProductsCount += givenProducts?.[i]?.quantity;

    // Push each item into the products array.
    formattedCart.products.push(product);
  }
  const coupon = data?.cart?.appliedCoupons;
  if (coupon) {
    formattedCart.discountCode = data?.cart?.appliedCoupons[0].code ?? null;
    formattedCart.discountAmount =
      data?.cart?.appliedCoupons[0].discountAmount ?? null;
  }

  formattedCart.shippingRate = data?.cart?.shippingTotal ?? '';
  formattedCart.totalProductsCount = totalProductsCount;
  formattedCart.subTotalProductsPrice = data?.cart?.subtotal ?? '';
  formattedCart.totalProductsPrice = data?.cart?.total ?? '';

  return formattedCart;
};

export const getUpdatedItems = (
  products: any,
  newQty: any,
  cartKey: string,
) => {
  // Create an empty array.
  const updatedItems: any = [];

  // Loop through the product array.
  products.map((cartItem: { cartKey: string; qty: any }) => {
    // If you find the cart key of the product user is trying to update, push the key and new qty.
    if (cartItem.cartKey === cartKey) {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: parseInt(newQty, 10),
      });

      // Otherwise just push the existing qty without updating.
    } else {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: cartItem.qty,
      });
    }
  });

  // Return the updatedItems array with new Qtys.
  return updatedItems;
};

export const createCheckoutData = (order: {
  billingDifferentThanShipping: boolean;
  billing: any;
  shipping: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    country: string;
    state: string;
    postcode: string;
    email: string;
    phone?: string;
    company?: string;
  };
  paymentMethod: string;
  createAccount?: boolean;
  username?: string;
  password?: string;
}) => {
  // Set the billing Data to shipping, if applicable.
  const billingData = order.billingDifferentThanShipping
    ? order.billing
    : order.shipping;

  const email = order?.shipping?.email;
  const phone = order?.shipping?.phone;

  const checkoutData = {
    clientMutationId: v4(),
    shipping: {
      firstName: order?.shipping?.firstName,
      lastName: order?.shipping?.lastName,
      address1: order?.shipping?.address1,
      address2: order?.shipping?.address2,
      city: order?.shipping?.city,
      country: order?.shipping?.country || 'US',
      state: order?.shipping?.state,
      postcode: order?.shipping?.postcode,
      email,
      phone,
      company: order?.shipping?.company,
    },
    billing: {
      firstName: billingData?.firstName,
      lastName: billingData?.lastName,
      address1: billingData?.address1,
      address2: billingData?.address2,
      city: billingData?.city,
      country: billingData?.country || 'US',
      state: billingData?.state,
      postcode: billingData?.postcode,
      email: order?.shipping?.email,
      phone: order?.shipping?.email,
      company: billingData?.company,
    },
    shipToDifferentAddress: order.billingDifferentThanShipping,
    paymentMethod: order.paymentMethod,
    isPaid: false,
  };

  // if (order.createAccount) {
  //   checkoutData.account = {
  //     username: order.username,
  //     password: order.password,
  //   };
  // }

  return checkoutData;
};

export const handleBillingDifferentThanShipping = (
  input: { billingDifferentThanShipping: any },
  setInput: (arg0: any) => void,
  target: { name: any },
) => {
  const newState = {
    ...input,
    [target.name]: !input.billingDifferentThanShipping,
  };
  setInput(newState);
};

// export const handleCreateAccount = (input, setInput, target) => {
//   const newState = { ...input, [target.name]: !input.createAccount };
//   setInput(newState);
// };

export const getDate = (date: any) => {
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

  const readableDate = `${month} - ${day} - ${year}`;

  return readableDate;
};
