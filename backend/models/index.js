import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize({
  // ...
});

export class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  { sequelize, modelName: "user" }
);
