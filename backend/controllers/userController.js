import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// authenticate User & get token
// POST /api/users/login
// Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   find user in db where email matches
  const user = await User.findOne({ email });

  //   if user exists we await the matchPassword function with pw from body - function comes from userModel
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email oder Passwort stimmen nicht überein.');
  }
});

// register new user
// POST /api/users/
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   find user in db where email matches
  const userExists = await User.findOne({ email });

  //   if user exists we await the matchPassword function with pw from body - function comes from userModel
  if (userExists) {
    res.status(400);
    throw new Error('Nutzer mit dieser E-Mail Adresse existiert bereits.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Ungültige Nutzerdaten');
  }
});

// get user profile
// GET /api/users/profile
// Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Benutzer nicht gefunden.');
  }
});

// update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Benutzer nicht gefunden.');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
