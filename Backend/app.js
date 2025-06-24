require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

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
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
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



//Error handling
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//start
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await require("./db/connect")(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

/* require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("MovieTracker is working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); */
