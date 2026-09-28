/**
 * Item routes — maps HTTP methods and paths to controller functions.
 * Mounted at /api/items in server.js.
 */
const express = require("express");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const router = express.Router();

router.route("/").post(createItem).get(getAllItems);
router.route("/:id").get(getItemById).put(updateItem).delete(deleteItem);

module.exports = router;
