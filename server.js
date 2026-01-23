const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8000;
const authRoute = require ("./routes/auth.js")
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect('mongodb://localhost:27017/syntaxscoutdatabase')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    app.use(express.json());
    app.use(cors({
        origin: "http://localhost:5173",
    }));

  app.use("/auth", authRoute);
  app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
    console.log(`Server running on port https://127.0.0.1:${port}`);
});
