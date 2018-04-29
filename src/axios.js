const config = require("configs/config");
const axios = require("axios");

const herokuBaseURL = config.herokuBaseURL;
const localBaseURL = config.localBaseURL;

const isLocal = false;
const baseURL = isLocal ? localBaseURL : herokuBaseURL;

const instance = axios.create({ baseURL: baseURL });
instance.defaults.timeout = 2500;

export const increaseCount = id => instance.post("/record/algorithm/" + id);

export default instance;
