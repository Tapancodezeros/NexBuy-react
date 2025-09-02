import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(4).max(25).required("Please enter your name"),
  username: Yup.string().min(6).max(12).required("Enter your UserName"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string().max(10).required("please enter your phone No"),
  password: Yup.string().min(5).max(11).required("Please enter your password"),
  confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Password must match"),
});
