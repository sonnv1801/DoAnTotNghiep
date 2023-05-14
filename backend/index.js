const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/Auth.routes");
const userRoute = require("./routes/User.routes");
const timeRoute = require("./routes/TimeConfig.routes");
const salaryRoute = require("./routes/Salary.routes");
const timeKPRoute = require("./routes/TimeKeeping.routes");
const PORT = 8000;
const app = express();

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the MongoDB!");
  })
  .catch((error) => {
    console.log(`Can not connect to database, ${error}`);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/time", timeRoute);
app.use("/v1/salary", salaryRoute);
app.use("/v1/timekp", timeKPRoute);

app.listen(8000, () => {
  console.log(`Server is runing port ${PORT}`);
});
