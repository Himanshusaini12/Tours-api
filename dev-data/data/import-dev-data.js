const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("./../../modals/tourModel");

dotenv.config({ path: "./config.env" });

// start server

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose.connect(DB, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// import to database

const importData = async () => {
  try {
    await Tour.create(tours);

    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//  Delete data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();

    console.log("Data ded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
