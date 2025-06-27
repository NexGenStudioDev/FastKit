// import { z } from 'zod';


// export function validateDatabaseConfig(config: unknown): { isValid: boolean; errors: string[]; config?: DatabaseConfig } {
//   try {
//     const validatedConfig = databaseConfigSchema.parse(config);
//     return {
//       isValid: true,
//       errors: [],
//       config: validatedConfig
//     };
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return {
//         isValid: false,
//         errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
//       };
//     }
//     return {
//       isValid: false,
//       errors: ['Unknown validation error'],
//     };
//   }
// }