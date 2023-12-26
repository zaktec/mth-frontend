import axios from "axios";
import { variables } from "../helpers";

const verifyAuth = () => {
    try {
      const data = localStorage.getItem('data');
      if (data) {
        const unstringfyData = JSON.parse(data);
        const { user, token } = unstringfyData;
        if (!token || token === undefined) window.location.replace('/');

        const configs = { headers: { Authorization: `BEARER ${token}` } };
        axios.get(variables.INVALID_TOKEN_API, configs)
        .then(() => console.log('OK'))
        .catch(() => window.location.replace('/'));

        return { user, token };
      }
  
      window.location.replace('/');
    } catch (error) {
      window.location.replace('/');
    }
};

const verifyRole = (role) => {
  try {
    if (role !== 'student' && role !== 'tutor' && role !== 'admin')
      window.location.replace('/');
    return null;
  } catch (error) {
    window.location.replace('/');
    return error.toString();
  }


}

const verifyDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId');
  if (deviceId !== null && deviceId !== undefined) return deviceId;
  localStorage.setItem('deviceId', Math.random().toString(36).substr(2, 16));
}

export { verifyAuth, verifyRole, verifyDeviceId };
