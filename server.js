const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path"); //built in
const { stringify } = require("querystring");

const app = express();
const PORT = process.env.PORT || 8080; //step 1

const routes = require("./routes/api");

// step 2
const MONGODB_URI =
  'mongodb+srv://aviralpulast:aviralpulast@mernapp.krl1z.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI || "mongodb://localhost/mern_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// neeche wala is just batane ke liye ki connect hua ki nhi
mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});

//data parsing
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// http request loggre
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`server si running at ${PORT}`);
});
