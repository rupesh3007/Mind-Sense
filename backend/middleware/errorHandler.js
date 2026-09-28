/**
 * Central error-handling middleware (must be registered last in Express).
 * Normalizes Mongoose and generic errors into consistent JSON responses.
 */

/**
 * Express error middleware signature: (err, req, res, next).
 * Never call next() after sending a response.
 */
function errorHandler(err, req, res, next) {
  // Default to 500 if status not set.
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Invalid MongoDB ObjectId passed to findById, etc.
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Mongoose schema validation failed.
  if (err.name === "ValidationError") {
    statusCode = 400;
    const first = Object.values(err.errors || {})[0];
    message = first ? first.message : message;
  }

  // Duplicate key (unique index) — optional handling if you add unique fields later.
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value";
  }

  // Log server errors for debugging (avoid leaking details in production if you prefer).
  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}

/**
 * Catches requests to unknown API paths (after all routes).
 */
function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}

module.exports = { errorHandler, notFound };
