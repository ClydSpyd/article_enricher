import axios from "axios";
import { feedFunctions } from "./feeds";

const baseHeaders = {
  common: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const baseClient = axios.create({
  headers: {
    ...baseHeaders,
  },
  baseURL: `/api`,
});

const API = {
  feed: feedFunctions,
};

export default API;
