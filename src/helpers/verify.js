const verifyAuth =  () => {
    try {
      const data = localStorage.getItem('data');
      if (data) {
        const unstringfyData = JSON.parse(data);
        const { user, token } = unstringfyData;
        if (!token || token === undefined) window.location.replace('/');
        if (token) return { user, token };
      }
  
      window.location.replace('/');
      return null;
    } catch (error) {
      window.location.replace('/');
      return error.toString();
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
