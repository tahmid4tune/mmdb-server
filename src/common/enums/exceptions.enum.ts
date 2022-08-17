const enum ExceptionMessages {
  USER_NOT_FOUND = 'User not found',
  PASSWORDS_MISMATCH = 'ConfirmedPassword must match Password',
  PASSWORD_MAX_LENGTH_ERROR = 'Password should not exceed 20 characters',
  PASSWORD_MIN_LENGTH_ERROR = 'Password must be at least 8 characters long',
  EMAIL_ALREADY_EXISTS = 'User with same email id already exists',
  NAME_LENGTH_ERROR = 'Name length should not exceed 20 characters',
  MOVIE_NAME_LENGTH_ERROR = 'Movie name should not exceed 40 characters',
  MOVIE_YEAR_MAX_ERROR = 'Movies from future are not allowed',
  MOVIE_YEAR_MIN_ERROR = 'First movie in history was released in 1895',
  MOVIE_INTRO_LENGTH_ERROR = 'Movie introduction should be between 20~500 characters',
  MOVIE_RATING_ERROR = 'Movie rating should be between 1~5',
  MOVIE_MAX_MIN_ERROR = 'Minimum rating should be less than or equal to maximum rating',
  EMAIL_NOT_VALID = 'Email is not valid',
  MOVIE_NOT_FOUND = 'Movie not found',
  MOVIE_UPDATE_NOT_AUTHORIZED = 'Movies added by others cannot be updated',
}

export default ExceptionMessages;
