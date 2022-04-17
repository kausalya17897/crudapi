import { ObjectId } from "mongodb";
import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function editSurveyById(id, data) {
  return await client
    .db("Branchsurvey")
    .collection("BranchSurveyCollectionNew")
    .updateOne({ _id: id }, { $set: data });
}
export async function getSurvey() {
  return await client
    .db("Branchsurvey")
    .collection("BranchSurveyCollectionNew")
    .find({})
    .toArray();
}
export async function deleteSurveyById(id) {
  return await client
    .db("Branchsurvey")
    .collection("BranchSurveyCollectionNew")
    .deleteOne({ _id: id });
}
export async function getSurveyById(id) {
  console.log("***", id);
  return await client
    .db("Branchsurvey")
    .collection("BranchSurveyCollectionNew")
    .findOne({ _id: ObjectId(id) });
}
export async function updateSurvey(data) {
  return await client
    .db("Branchsurvey")
    .collection("BranchSurveyCollectionNew")
    .insertMany(data);
}
export async function createUser(data) {
  return await client
    .db("Branchsurvey")
    .collection("usersdata")
    .insertOne(data);
}
export async function getUserByEmail(email) {
  return await client
    .db("Branchsurvey")
    .collection("usersdata")
    .findOne({ email: email });
}
async function genPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log("salt", salt);
  const hashpassword = await bcrypt.hash(password, salt);
  console.log(hashpassword);
  return hashpassword;
}
export { genPassword };
