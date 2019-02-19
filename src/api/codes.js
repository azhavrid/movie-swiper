const ERROR_MESSAGES = {
  10: 'Access to your account has been suspended. Please contact TMDb',
  14: 'Authentication failed',
  30: 'Invalid username and/or password',
  31: 'Your account is no longer active. Please contact TMDb',
  32: 'Your email address has not been verified',
  default: 'Something went wrong. Please try again later.'
};

export const getTmdbErrorMessage = errorCode => ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default;
