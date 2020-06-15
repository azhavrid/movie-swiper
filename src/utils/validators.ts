import validator from 'validator';

/* ------------- Types ------------- */
type ErrorMessage = string;
type ValidatorFunction = (str: string) => boolean;
type CustomValidator = [ValidatorFunction, ErrorMessage];

interface ValidatorResponse {
  isValid: boolean;
  errorMessage: string;
}

/* ------------- Validators ------------- */
// Username
const usernameValidators: CustomValidator[] = [[validator.isEmpty, 'Please enter your username']];
export const validateUsername = (username: string) => validateString(usernameValidators, username);

// Password
const passwordValidators: CustomValidator[] = [
  [validator.isEmpty, 'Please enter your password'],
  [value => value.length < 4, 'Password is too short'],
];
export const validatePassword = (password: string) => validateString(passwordValidators, password);

/* ------------- Helpers ------------- */
const validateString = (validators: CustomValidator[], value: string): ValidatorResponse => {
  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i];
    const [validateFunction, errorMessage] = validator;
    if (validateFunction(value)) {
      return { isValid: false, errorMessage };
    }
  }

  return { isValid: true, errorMessage: '' };
};
