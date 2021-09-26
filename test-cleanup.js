const { default: axios } = require("axios");
const _Global = require("./_Global");


const cleanup = async () => {
  try {
    console.log("CLEANING UP -----");
    const data = await axios(_Global.API_URL + "/sheruta/cleanup");
    console.log("CLEAN UP RESPONSE --", data.data);
    console.log("CLEAN UP DONE!");
    return Promise.resolve();
  } catch (error) {
    console.log('CLEAN UP ERROR --', error);
    Promise.reject();
  }
};
cleanup()