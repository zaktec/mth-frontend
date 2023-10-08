const verifyAuth =  () => {
    try {
      const data = localStorage.getItem('data');
      if (data) {
        const unstringfyData = JSON.parse(data);
        const { id, token } = unstringfyData;
        if (!token || token === undefined) window.location.replace('/');
        if (token) {  console.log('OK, Auth Success.'); return { id, token }; };
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
export { verifyAuth, verifyRole };
