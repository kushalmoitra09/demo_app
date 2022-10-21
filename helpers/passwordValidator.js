const passwordValidator = (password, setError) => {
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  if (!passwordRegex.test(password)) {
    return false;
  }
  return true;
};

module.exports = passwordValidator;
