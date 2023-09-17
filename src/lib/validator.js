import validator from "validator";

export default function registerValidator(data) {
  //console.log(data);
  const isCorrectEmail = validator.isEmail(data.email);
  const isPassword = validator.isLength(data.password, { min: 4, max: 15 });
  const isConfirmPassword = validator.isLength(data.confirmPassword, {
    min: 4,
    max: 15,
  });
  const isSamePassword = isPassword === isConfirmPassword;

  if (!isCorrectEmail || !isPassword || !isConfirmPassword || !isSamePassword)
    return false;
  return true;
}
