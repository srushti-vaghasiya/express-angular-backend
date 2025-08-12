import { Role } from "@entities/User";
import * as yup from "yup";

const phonePattern = /^\d{10}$/;

export const createUserSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  mobile: yup
    .string()
    .matches(phonePattern, "Invalid mobile number")
    .required(),
  role: yup.string().oneOf(Object.values(Role)).default(Role.USER),
});

export const updateUserSchema = yup.object({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  mobile: yup
    .string()
    .matches(phonePattern, "Invalid mobile number")
    .optional(),
  role: yup.string().oneOf(Object.values(Role)).optional(),
});
