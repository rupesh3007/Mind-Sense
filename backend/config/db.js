/**
 * Database configuration: connects Mongoose to MongoDB using MONGODB_URI from .env.
 * Import and call connectDB() once when the app boots (see server.js).
 */
const mongoose = require("mongoose");

/**
 * Establishes a single connection to MongoDB.
 * @returns {Promise<void>}
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Create a .env file (see .env.example)."
    );
  }

  // Only match the literal template password in the URI (not random words in comments elsewhere).
  if (uri.includes(":REPLACE_WITH_YOUR_PASSWORD@")) {
    throw new Error(
      "Edit backend/.env: put your real Atlas database user password in MONGODB_URI (between : and @), save, then run npm start again."
    );
  }

  try {
    // Atlas can be slower than localhost; allow extra time to pick a server.
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20000,
    });
  } catch (err) {
    const msg = (err && err.message) || String(err);
    const lower = msg.toLowerCase();
    if (lower.includes("bad auth") || lower.includes("authentication failed")) {
      throw new Error(
        "Atlas authentication failed. Use the Database User password from Atlas (Database Access), not your Atlas account login. Special characters in the password must be URL-encoded inside MONGODB_URI. Details: " +
          msg
      );
    }
    if (lower.includes("querysrv") || lower.includes("enotfound")) {
      throw new Error(
        "Could not resolve Atlas hostname — check MONGODB_URI for typos and your internet/DNS. Details: " +
          msg
      );
    }
    if (
      lower.includes("timed out") ||
      lower.includes("server selection") ||
      lower.includes("econnrefused")
    ) {
      throw new Error(
        "Cannot reach Atlas. In Atlas → Network Access, add your IP or 0.0.0.0/0 (testing), wait 1–2 minutes, retry. Details: " +
          msg
      );
    }
    throw err;
  }
  console.log("MongoDB connected");
}

module.exports = { connectDB };
