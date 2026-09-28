/**
 * Item controllers: handle HTTP logic for /api/items routes.
 * Each handler reads/writes the Item model and passes errors to next().
 */
const Item = require("../models/Item");

/**
 * POST /api/items — create a new item from JSON body.
 */
async function createItem(req, res, next) {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/items — return all items, newest first.
 */
async function getAllItems(req, res, next) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/items/:id — return one item by MongoDB _id.
 */
async function getItemById(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: "Item not found" });
      return;
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/items/:id — replace/update fields on an existing item.
 */
async function updateItem(req, res, next) {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      res.status(404).json({ success: false, message: "Item not found" });
      return;
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/items/:id — remove an item by id.
 */
async function deleteItem(req, res, next) {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: "Item not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Item deleted", data: item });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
