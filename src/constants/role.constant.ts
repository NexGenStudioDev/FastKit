export const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  USER: 'user',
} as const;

export const ROLE_ERRORS = {
  FORBIDDEN: 'Access denied: insufficient role permissions.',
  UNAUTHORIZED: 'User must be authenticated.',
} 
