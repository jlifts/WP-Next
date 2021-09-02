/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  const returnItemThatExists = (item: any, index: number) => {
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
