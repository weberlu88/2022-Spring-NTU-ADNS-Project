import express from "express";
export const apiRouter = express.Router();

apiRouter.get("/users", (req, res, next) => {
  res.json([
    {
      id: 1,
      username: "janedoe",
      birthday: "1980-07-19T16:00:00.000Z",
    },
  ]);
});

// import express from "express";
// import { User } from "../models";

// export const apiRouter = express.Router();

// apiRouter.get("/users", (req, res, next) => {
//   User.findAll()
//     .then((instance) =>
//       res.status(200).send(instance))
//     .catch(next);
// });
// module.exports = { api };

