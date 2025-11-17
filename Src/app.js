const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");

require("dotenv").config();

// ---------------------------------------
// CORS (Local + Production)
// ---------------------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL || "http://13.232.171.142"
    ],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ---------------------------------------
// ROUTES (All under /api prefix)
// ---------------------------------------
const authRouter = require("./routes/authRout");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/userRout");
const chatRouter = require("./routes/chat");

app.use("/api", authRouter);
app.use("/api", requestRouter);
app.use("/api", profileRouter);
app.use("/api", userRouter);
app.use("/api", chatRouter);

// ---------------------------------------
// SOCKET SERVER
// ---------------------------------------
const server = http.createServer(app);
initializeSocket(server);

// ---------------------------------------
// Start Server
// ---------------------------------------
connectDB()
  .then(() => {
    console.log("Database Connected successfully");
    server.listen(3001, () => {
      console.log("SERVER STARTED ON PORT 3001");
    });
  })
  .catch((err) => {
    console.error("Database Not Connected ", err);
  });
