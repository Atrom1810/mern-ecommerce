import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// create new order
// POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, taxPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Keine Artikel im Warenkorb');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      taxPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
