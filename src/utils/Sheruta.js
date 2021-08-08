import { notification } from "antd";
import axios from "axios";
import Compressor from "compressorjs";

export const notifyEmy = ({ heading, body }) => {
  axios(process.env.REACT_APP_API_URL + "/user-feedbacks/notify/emy", {
    method: "POST",
    data: {
      heading,
      body,
    },
  })
    .then((res) => {
      console.log("notified emy");
    })
    .catch((err) => {});
};

export  function compressImage(file) {
  console.log("FILE ---", file);
  if (!file) {
    return false;
  }
  const value = new Compressor(file, {
    quality: 0.1,
    success(result) {
      compressImage = result;
    },
    error(err) {
      notification.error({ message: "Error compressing image" });
      console.log(err.message);
    },
  });
  return value.file;
}
