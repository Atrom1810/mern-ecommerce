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

// get order by id
// GET /api/orders/:id
// Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Bestellung existiert nicht');
  }
});

// update order to paid
// put /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // from Paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Bestellung existiert nicht');
  }
});

// get logged in user orders
// get /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// get all orders
// get /api/orders/
// Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');

  res.json(orders);
});

// update order to paid
// put /api/orders/:id/pay
// Private
const updateOrderForDelivery = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Bestellung existiert nicht');
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderForDelivery };
