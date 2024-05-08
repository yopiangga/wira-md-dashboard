import axios from "axios";
import { baseUrl } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import { headers, headersFormData } from "./config";

export class UsersServices {
  async getUsers() {
    try {
      const res = await axios.get(`${baseUrl}/users`, { headers });
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

  async getUserById({ id }) {
    try {
      const res = await axios.get(`${baseUrl}/users/${id}`, { headers });
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

  async createUser({ name, email, password, role, idHospital, image }) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("idHospital", idHospital);
    formData.append("image", image);

    try {
      const res = await axios.post(`${baseUrl}/users`, formData, {
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

  async updateUser({id, name, email, password, role, idHospital }) {
    try {
      const res = await axios.put(`${baseUrl}/users/${id}`, {
        name,
        email,
        password,
        role,
        idHospital,
      }, {
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

  async updateUserImage({ id, image }) {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.put(`${baseUrl}/users/${id}/image`, formData, {
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

  async deleteUser({ id }) {
    try {
      const res = await axios.delete(`${baseUrl}/users/${id}`, {
        headers,
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
