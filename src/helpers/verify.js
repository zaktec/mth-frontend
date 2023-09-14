const verifyAuth = () => {
    try {
      const data = localStorage.getItem('data');
      if (data) {
        const unstringfyData = JSON.parse(data);
        const { token } = unstringfyData;
        if (!token || token === undefined) window.location.replace('/home');
        if (token) {  console.log('OK, Auth Success.'); return { token }; };
      }
  
      window.location.replace('/home');
      return null;
    } catch (error) {
      window.location.replace('/home');
      return error.toString();
    }
};

export { verifyAuth };
