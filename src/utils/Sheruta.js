import { notification } from "antd";
import axios from "axios";
import Compressor from "compressorjs";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const token = Cookies.get("token");

export const notifyEmy = ({ status, url, property, log, heading }) => {
  axios(process.env.REACT_APP_API_URL + "/logs", {
    method: "POST",
    data: {
      status,
      user_id: token ? jwt.decode(token) : null,
      url,
      property,
      log,
      heading
    },
  })
};

export function compressImage(file) {

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
