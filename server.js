const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8000;
const authRoute = require ("./routes/auth.js")
const membersDashboardRoutes = require("./routes/membersDashboardRoutes.js");
const dotenv = require("dotenv");
dotenv.config();

const dbURI = process.env.DATABASE;

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));


mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


  
    app.use(express.json());
    app.use(cors({
        origin: ["http://localhost:5173", "https://syntaxscout-frontend.vercel.app"],
    }));

  app.use("/auth", authRoute);
  app.use("/member", membersDashboardRoutes);

app.listen(port, () => {
    console.log(`Server running on port https://127.0.0.1:${port}`);
});


