const {
  getUsersByIncomeAndCarBrand,
  getMaleUsersByPhonePrice,
  getUsersByLastNameAndQuoteAndEmail,
  getUsersByCarBrandAndEmail,
  getTopCitiesWithHighestNumberOfUsers,
  <!-- insertSampleData -->
} = require("../controllers/dataController");

const router = require("express").Router();

router.get("/getUsersByIncomeAndCarBrand", getUsersByIncomeAndCarBrand);
router.get("/getMaleUsersByPhonePrice", getMaleUsersByPhonePrice);
router.get("/getUsersByLastNameAndQuoteAndEmail", getUsersByLastNameAndQuoteAndEmail);
router.get("/getUsersByCarBrandAndEmail", getUsersByCarBrandAndEmail);
router.get("/getTopCitiesWithHighestNumberOfUsers", getTopCitiesWithHighestNumberOfUsers);
<!-- router.get("/insertSampleData", insertSampleData); -->

module.exports = router;
