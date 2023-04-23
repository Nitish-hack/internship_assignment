const User = require("../models/userModel");
const mongoose = require('mongoose');
<!-- const sampledata=require("../sample"); -->
// 1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
module.exports.getUsersByIncomeAndCarBrand = async (req, res) => {
  try {
    const users = await User.find({
      income: { $lt: "$5" },
      car: { $in: ["BMW", "Mercedes-Benz"] },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2. Male Users which have phone price greater than 10,000.
module.exports.getMaleUsersByPhonePrice = async (req, res) => {
  try {
    const users = await User.find({
      gender: "Male",
      phone_price: { $gt: 10000 },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
module.exports.getUsersByLastNameAndQuoteAndEmail = async (req, res) => {
  try {
    const users = await User.find({
      last_name: { $regex: /^M/ },
      quote: { $exists: true, $regex: /^.{15,}$/ },
      email: { $regex: /mcmurty/ },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
module.exports.getUsersByCarBrandAndEmail = async (req, res) => {
  try {
    const users = await User.find({
      car: { $in: ["BMW", "Mercedes", "Audi"] },
      email: { $not: /\d/ },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 5. Show the data of top 10 cities which have the highest number of users and their average income.
exports.getTopCitiesWithHighestNumberOfUsers = async (req, res) => {
  try {
    const topCities = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          avg_income: {
            $avg: {
              $toDouble: { $substr: ["$income", 1, -1] }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          avg_income: { $round: ["$avg_income", 2] }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    res.status(200).json(topCities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



<!-- insertion data into the databse -->

module.exports.insertSampleData = async (req,res) => {
  try {  
    await User.insertMany(sampledata);
    console.log('Sample data inserted successfully');
      res.status(200).json({ message: "Insertion successfull" });
  } catch (error) {
    console.error('Error inserting sample data', error);
      res.status(500).json({ message: "Internal server error" });
  } 
};
