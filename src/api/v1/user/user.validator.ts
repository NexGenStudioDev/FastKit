import zod from 'zod';

export const UserValidator = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().email({ message: 'Invalid email format' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters long' }),
});
