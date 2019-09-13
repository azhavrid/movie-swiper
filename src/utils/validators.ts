import validator from 'validator';

/* ------------- Types ------------- */
interface CustomValidator {
  validator: (value: string) => boolean;
  errorMessage: string;
}

interface ValidatorResponse {
  isValid: boolean;
  message: string;
}

/* ------------- Validators ------------- */
export const validateUsername = (username: string): ValidatorResponse => {
  const validators: CustomValidator[] = [
    {
      validator: validator.isEmpty,
      errorMessage: 'Please enter your username',
    },
  ];

  return validateString(validators, username);
};

export const validatePassword = (password: string): ValidatorResponse => {
  const validators: CustomValidator[] = [
    {
      validator: validator.isEmpty,
      errorMessage: 'Please enter your password',
    },
    {
      validator: value => value.length < 4,
      errorMessage: 'Password is too short',
    },
  ];

  return validateString(validators, password);
};

/* ------------- Local Helpers ------------- */
const validateString = (validators: CustomValidator[], value: string): ValidatorResponse => {
  validators.map(customValidator => {
    if (customValidator.validator(value)) {
      return { isValid: false, message: customValidator.errorMessage };
    }
  });

  return { isValid: true, message: '' };
};
