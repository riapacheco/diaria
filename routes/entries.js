const express = require('express');
const {
  getEntries,
  createEntry,
  getEntry,
  updateEntry,
  deleteEntry
} = require('../controllers/entries');
const router = express.Router();

router.route('/')
      .get(getEntries)
      .post(createEntry);
router.route('/:id')
      .get(getEntry)
      .put(updateEntry)
      .delete(deleteEntry);

module.exports = router;