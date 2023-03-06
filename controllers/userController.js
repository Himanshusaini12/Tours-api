const express=require('express')
const User = require("./../modals/userModel");

exports.getAllUsers = async(req, res) => {
  
  const user = await User.find();
  res.status(500).json({
    status: "success",
    message: user
  });
};

exports.createUser = (req, res) => {
  res.send(500).json({
    status: "error",
    message: "this route is not yet implemented",
  });
};