import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectToDB from './config/db.js';

dotenv.config();

connectToDB();

const importData = async () => {
  try {
    // clear db data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //   insert db data
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      // spread operator: take all the data from product, just put user manually
      return { ...product, user: adminUser };

      console.log('data imported');
      process.exit();
    });
    await Product.insertMany(sampleProducts);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // clear db data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('data destroyed');
    process.exit();
    await Product.insertMany(sampleProducts);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
