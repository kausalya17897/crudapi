import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import { surveyRouter } from "./routes/survey.js";
import cors from "cors";

import { usersRouter } from "./routes/users.js";
dotenv.config(); // getting file from .env
console.log(process.env);
const app = express();
//const PORT=8000;
const PORT = process.env.PORT;

//app.use(cors({allowedHeaders: "*"}));  //3rd party middleware to access data
const MONGO_URL = process.env.MONGO_URL;
//const MONGO_URL="mongodb://localhost";
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb connected");
  return client;
}
export const client = await createConnection();
//middleware
app.use(express.json());
//const dbConnection=require('./db')

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (request, response) => {
  response.send("hello");
});
app.use("/usersdata", usersRouter);
app.use("/BranchSurvey", surveyRouter);

app.listen(PORT, () => console.log(`App is started ${PORT}`));
