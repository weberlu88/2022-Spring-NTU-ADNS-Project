import axios from "axios";
import { makeUser } from "./user";

const services = {};
const instance = axios.create({
  baseURL: "/api/v1",
});

services.user = makeUser(instance);

export default services;
