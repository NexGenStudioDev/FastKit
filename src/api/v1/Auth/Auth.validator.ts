import { z } from 'zod';

export const LoginValidator = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const SignupValidator = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email format'),
    password: z.string().trim().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()

      .min(6, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Path to the field causing the error
  });

// Password Reset Validator
export const ResetPasswordValidator = z
  .object({
    email: z.string().email('Invalid email format'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
    confirmNewPassword: z
      .string()
      .min(6, 'Confirm new password must be at least 6 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

// Change Password Validator
export const ChangePasswordValidator = z
  .object({
    oldPassword: z.string().min(6, 'Old password must be at least 6 characters long'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
    confirmNewPassword: z
      .string()
      .min(6, 'Confirm new password must be at least 6 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });
