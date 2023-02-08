const express = require("express");
const Tour = require("./../modals/tourModel");
const fs = require("fs");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAlltours = async (req, res) => {
  const tours = await Tour.find();
  res
    .status(200)
    .json({ status: "success", results: tours.length, data: { tours } });
};

exports.getTour = async (req, res) => {
  // const id = req.params.id * 1;
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({ status: "success", data: tour });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: { tour },
    });
  } catch (err) {
    res.json({
      error: { err },
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(204).json({ status: "error", data: err });
  }
};
