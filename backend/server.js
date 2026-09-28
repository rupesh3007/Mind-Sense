/**
 * Application entry point: loads environment, connects to MongoDB,
 * configures middleware (JSON body parsing, CORS), mounts routes,
 * and starts the HTTP server.
 */
// Use values from backend/.env even if MONGODB_URI was set earlier in the shell/Windows env.
require("dotenv").config({ override: true });

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// --- Core middleware ---

// Parse JSON bodies (same role as body-parser.json in older Express apps).
app.use(express.json());

// Allow cross-origin requests from React frontend.
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.includes(",")
    ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim())
    : process.env.CORS_ORIGIN
  : true;

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

// Optional: log incoming requests in development.
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// --- Routes ---

// Health check (useful for uptime monitors).
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// REST API for items (CRUD).
app.use("/api/items", itemRoutes);

// --- Error handling (order matters: 404 first, then global handler) ---

app.use(notFound);
app.use(errorHandler);

// --- Start server after DB is ready ---

const PORT = Number(process.env.PORT) || 5000;

console.log("\n--- MindSense BACKEND ---");
console.log("Folder:", __dirname);
console.log("PORT from .env:", process.env.PORT || "(default 5000)");

connectDB()
  .then(() => {
    // 0.0.0.0 avoids some Windows setups where "localhost" does not hit the listener.
    app.listen(PORT, "0.0.0.0", () => {
      console.log("\n>>> RUNNING <<<");
      console.log("  http://127.0.0.1:" + PORT + "/health");
      console.log("  http://localhost:" + PORT + "/health");
      console.log("Keep this window open while you use the website.\n");
    });
  })
  .catch((err) => {
    console.error("\n!!! FAILED TO START !!!");
    console.error(err.message);
    console.error("\nFix MongoDB Atlas in backend/.env, then run again.\n");
    process.exit(1);
  });
