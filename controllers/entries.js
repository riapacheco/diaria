const asyncHandler = require('../middleware/async');
const Entry = require('../models/Entry');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc      Show all entries
 * @route     GET /api/v1/entries
 * @access    Public
 */
exports.getEntries = asyncHandler(async (req, res, next) => {
  const entries = await Entry.find();
  res.status(200).json({ success: true, count: entries.length, data: entries });
});

/**
 * @desc      Show single entry
 * @route     GET /api/v1/entries/:id
 * @access    Public
 */
exports.getEntry = asyncHandler(async (req, res, next) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry) { return next(new ErrorResponse(`No entry found with id of ${req.params.id}`, 404)); }
  res.status(200).json({ success: true, data: entry });
});

/**
 * @desc      Create new entry
 * @route     POST /api/v1/entries
 * @access    Private
 */
exports.createEntry = asyncHandler(async(req, res, next) => {
  const entry = await Entry.create(req.body);
  res.status(201).json({ success: true, data: entry });
});

/**
 * @desc      Update entry
 * @route     PUT /api/v1/entries/:id
 * @access    Private
 */
exports.updateEntry = asyncHandler(async(req, res, next) => {
  const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!entry) { return next(new ErrorResponse(`No entry found with id of ${req.params.id}`, 404)); }
  res.status(200).json({ success: true, data: entry });
});

/**
 * @desc      Delete entry
 * @route     DELETE /api/v1/entries/:id
 * @access    Private
 */
exports.deleteEntry = asyncHandler(async(req, res, next) => {
  const entry = await Entry.findByIdAndDelete(req.params.id);
  if (!entry) { return next(new ErrorResponse(`No entry found with id of ${req.params.id}`, 404)); }
  res.status(200).json({ success: true, data: {} });
});
