import axios from "axios";
import { baseUrl } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import { headers, headersFormData } from "./config";

export class UserServices {
  async myProfile() {
    try {
      const res = await axios.get(`${baseUrl}/user/me`, { headers });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }

  async updateProfile({ name}) {
    try {
      const res = await axios.put(`${baseUrl}/user/me`, {name}, {
        headers: headers,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }

  async updateProfileImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.put(`${baseUrl}/user/me/image`, formData, {
        headers: headersFormData,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        handleOtherStatusCodes(res.status);
        return false;
      }
    } catch (err) {
      handleAxiosError(err);
      return false;
    }
  }
}
