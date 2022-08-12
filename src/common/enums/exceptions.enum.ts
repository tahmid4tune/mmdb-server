const enum ExceptionMessages {
  USER_NOT_FOUND = 'User not found',
  PASSWORDS_MISMATCH = 'ConfirmedPassword must match Password',
  PASSWORD_MAX_LENGTH_ERROR = 'Password should not exceed 20 characters',
  PASSWORD_MIN_LENGTH_ERROR = 'Password must be at least 8 characters long',
  EMAIL_ALREADY_EXISTS = 'User with same email id already exists',
  NAME_LENGTH_ERROR = 'Name length should not exceed 20 characters',
  EMAIL_NOT_VALID = 'Email is not valid',
}

export default ExceptionMessages;
