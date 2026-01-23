// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const port = 8000;
// const authRoute = require ("./routes/auth.js")
// const dashboardRoutes = require("./routes/dashboardRoutes.js");
// const dotenv = require("dotenv");
// dotenv.config();

// const dbURI = process.env.DATABASE;

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

//     app.use(express.json());
//     app.use(cors({
//         origin: "http://localhost:5173",
//     }));

//   app.use("/auth", authRoute);
//   app.use("/dashboard", dashboardRoutes);

// app.listen(port, () => {
//     console.log(`Server running on port https://127.0.0.1:${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000; // Use Render's dynamic port
const authRoute = require("./routes/auth.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const dotenv = require("dotenv");
dotenv.config();

const dbURI = process.env.DATABASE;

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(express.json());

// FIXED: Allow both localhost and Vercel
const allowedOrigins = [
  "http://localhost:5173",
  "https://syntaxscout-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});