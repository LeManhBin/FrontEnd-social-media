import * as yup from "yup";

const validateMessage = {
  firstNameValidate: "please enter your first",
  lastNameValidate: "Please enter your last name",
  emailValidate: "Please enter your email",
  passwordValidate: "Please enter your password",
};

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required(validateMessage.firstNameValidate)
    .min(2, "First name must be more than 2 characters"),
  lastName: yup
    .string()
    .required(validateMessage.lastNameValidate)
    .min(2, "Last name must be more than 2 characters"),
  occupation: yup.string(),
  email: yup
    .string()
    .required(validateMessage.emailValidate)
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required(validateMessage.passwordValidate)
    .min(6, "Password must be more than 6 characters"),
});
