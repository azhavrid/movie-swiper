import validator from 'validator';

export const validateUsername = username => {
  let isValid = false;
  let message = '';

  if (validator.isEmpty(username)) {
    message = 'Please enter your username.';
  } else {
    isValid = true;
  }

  return { isValid, message };
};

export const validatePassword = password => {
  let isValid = false;
  let message = '';

  if (validator.isEmpty(password)) {
    message = 'Please enter your password.';
  } else if (password.length < 4) {
    message = 'Password is too short.';
  } else {
    isValid = true;
  }

  return { isValid, message };
};
