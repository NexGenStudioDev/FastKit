export const ROLES = {
  ADMIN: 'admin',     // Full administrative privileges
  STUDENT: 'student', // Standard student privileges
  BASIC: 'user',      // Basic, non-privileged user
} as const;

export const ROLE_ERRORS = {
  FORBIDDEN: 'Access denied: insufficient role permissions.',
  UNAUTHORIZED: 'User must be authenticated.',
} as const;
