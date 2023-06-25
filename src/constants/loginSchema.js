import * as yup from "yup";

const validateMessage = {
  emailValidate: "Please enter your email",
  passwordValidate: "Please enter your password",
};

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(validateMessage.emailValidate)
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required(validateMessage.passwordValidate)
    .min(6, "Password must be more than 6 characters"),
});
