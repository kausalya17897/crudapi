import {
  getSurvey,
  updateSurvey,
  getSurveyById,
  editSurveyById,
  deleteSurveyById,
} from "../Helper.js";
import express from "express";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router
  .route("/")
  .get(auth, async (request, response) => {
    const survey = await getSurvey();
    const token = request.body.jwt;
    console.log(survey);
    response.send(survey);
    response.json({ jwt: token });
  })
  .post(auth, async (request, response) => {
    const data = request.body;
    const token = request.body.jwt;
    const result = await updateSurvey(data);
    response.send(result);
    response.json({ jwt: token });
    {
      /*response.send(data)*/
    }
  });

router
  .route("/:id")
  .get(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    const survey = await getSurveyById(id);
    survey
      ? response.send(bike)
      : response.status(404).send({ message: "No maching bike" });
  })
  .put(async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    const surveyupdate = await editSurveyById(id, data);
    response.send(surveyupdate);
  })
  .delete(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    const survey = await deleteSurveyById(id);

    survey
      ? response.send(survey)
      : response.status(404).send({ message: "No maching survey" });
  });

export const surveyRouter = router;
