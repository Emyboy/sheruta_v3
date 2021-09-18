const { default: axios } = require("axios");
const _Global = require("./_Global");
console.log("ENV --", process.env.NODE_ENV);

// (async () => {
//   if(process.env.NODE_ENV === 'development'){
//   }
// })()
// axios(_Global.API_URL + "/sheruta/cleanup")
//   .then((res) => {
//     console.log("CLEAN UP --", res.data);
//   })
//   .catch((err) => {
//     console.log("CLEAN UP ERROR --", err);
//   });

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