const express = require("express");
const app = express();
const citizens = require("./routes/citizens");
const accounts = require("./routes/accounts");
const pollsters = require("./routes/pollsters");

const cors = require("cors");
app.use(express.json());
app.use(cors());

const Admin = require("./models/Admin");
const User = require("./models/User");

app.use("/citizens", citizens);
app.use("/accounts", accounts);
app.use("/pollsters", pollsters);

app.post("/ping", (req, res) => {
  res.send("pong");
});

require("dotenv").config();
const dbConnData = {
  host: process.env.MONGO_HOST || "my-mongo",
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || "spis",
};

const mongoose = require("mongoose");

const addAdmin = async () => {
  try {
    if (await !Admin.exists({ login: "admin" })) {
      const adm = new Admin({ login: "admin", password: "admin" });
      await adm.save();
      console.log("Dodano Admina !!!");
    }
  } catch (error) {
    console.log(error);
  }
};

const addUser = async () => {
  try {
    if (await !User.exists({ email: "user@example.com" })) {
      const user = new User({
        email: "user@example.com",
        password: "password",
      });
      await user.save();
      console.log("Dodano Usera !!!");
    }
  } catch (error) {
    console.log(error);
  }
};

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    addAdmin();
    addUser();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB", error));
