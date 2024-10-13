import axios from "axios";
import { feedFunctions } from "./feeds";
import { articleFunctions } from "./article";

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
  article: articleFunctions,
};

export default API;
