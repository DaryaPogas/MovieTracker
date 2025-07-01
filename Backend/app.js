require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://movie-tracker-blond.vercel.app",
        "https://movietracker-ryhw.onrender.com",
        "https://movie-tracker-git-swagger-daryas-projects-fc1ee936.vercel.app",
      ]
    : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//security
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  if (req.path === "/multiply") {
    res.set("Content-Type", "application/json");
  } else {
    res.set("Content-Type", "text/html");
  }
  next();
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    res.set("Content-Type", "application/json");
  }
  next();
});

// routes
const auth = require("./middleware/auth");
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/movies", auth, require("./routes/movies"));

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/multiply", (req, res) => {
  const result = req.query.first * req.query.second;
  if (isNaN(result)) {
    res.json({ result: "NaN" });
  } else if (result == null) {
    res.json({ result: "null" });
  } else {
    res.json({ result: result });
  }
});

app.get("/", (req, res) => {
  res.send("<html><body><h1>Welcome</h1><p>Click this link</p></body></html>");
});


//Error handling
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//start
// const port = process.env.PORT || 3000;
// const start = async () => {
//   try {
//     const mongoURL =
//       process.env.NODE_ENV === "test"
//         ? process.env.MONGO_URI_TEST
//         : process.env.MONGO_URI;

//     await require("./db/connect")(mongoURL);

//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();
const port = process.env.PORT || 3000;
const mongoURL =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

const start = () => {
  try {
    require("./db/connect")(mongoURL);
    return app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app };
