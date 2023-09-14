const validateSignup = (state) => {
  try {
  // Validate Strong Password Algorithm
    const getInsertedUserPassword = state.password;
    const giveFormatInsertedUserPassword = getInsertedUserPassword.toString().trim().toLowerCase();
    const passwordLength = giveFormatInsertedUserPassword.length < 6 || giveFormatInsertedUserPassword.length > 16;
    const passwordContainNumber = (giveFormatInsertedUserPassword.search(/[0-9]/) === -1);
    const passwordContainCharacter = (giveFormatInsertedUserPassword.search(/[! @ # $ % & * ~ ` : "" '' ' " ? / , .]/) === -1);

    let error = null;

    if (state.username.length < 1 && state.password.length < 1) {
      error = 'Username and Password are required';
      return error
    }

    if (state.username.length < 1) {
      error = 'Username is required';
      return error
    }

    if (state.username.length < 4) {
      error = 'Username should have 4 characters';
      return error
    }

    if (state.password.length < 1) {
      error = 'Password is required';
      return error;
    }

    if (passwordLength || passwordContainNumber || passwordContainCharacter) {
      error = 'Strong password is required. eg:qwerty@123';
      return error;
    }

    if (state.password !== state.confirmPassword) {
      error = 'Confirm Password and Password not match';
      return error;
    }

    return error;
  } catch (error) {
    return error.toString();
  }
};

const validateSignin = (state) => {
    try {
    // Validate Strong Password Algorithm
      const getInsertedUserPassword = state.password;
      const giveFormatInsertedUserPassword = getInsertedUserPassword.toString().trim().toLowerCase();
      const passwordLength = giveFormatInsertedUserPassword.length < 6 || giveFormatInsertedUserPassword.length > 16;
      const passwordContainNumber = (giveFormatInsertedUserPassword.search(/[0-9]/) === -1);
      const passwordContainCharacter = (giveFormatInsertedUserPassword.search(/[! @ # $ % & * ~ ` : "" '' ' " ? / , .]/) === -1);
  
      let error = null;

      if (state.username.length < 1 && state.password.length < 1) {
        error = 'Username and Password are required';
        return error
      }
  
      if (state.username.length < 1) {
        error = 'Username is required';
        return error
      }
  
      if (state.username.length < 4) {
        error = 'Username should have 4 characters';
        return error
      }

      if (state.password.length < 1) {
        error = 'Password is required';
        return error;
      }
  
      if (passwordLength || passwordContainNumber || passwordContainCharacter) {
        error = 'Strong password is required. eg:qwerty@123';
        return error;
      }
  
      return error;
    } catch (error) {
      return error.toString();
    }
};

export { validateSignup, validateSignin };
