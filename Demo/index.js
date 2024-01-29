require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const connectDB = require("./database/db");
const authRoute = require("./router/auth-route");
const contactRoute = require("./router/contact-router");
const errorMiddleware = require("./middlewares/error-middleware");

var corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
};

app.use(cors(corsOptions));

// we write this line because we can use json in this application
app.use(express.json());

// database config
// connectDB is a function which return a promise
// to use that function we call it here
connectDB();

// Mount the router :- To use the router in your main Express app,
// you can "mount" it at a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// this middleware is used for error handling purpose
app.use(errorMiddleware); // Always keep this middleware at the bottom as we put it here

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api/auth`);
});
