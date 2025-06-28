import { execSync } from 'child_process';

export function startProd() {
  console.log('Running pre-production tasks: format, lint, build');
  execSync('pnpm run format && pnpm run lint --fix && pnpm run build', { stdio: 'inherit' });

  console.log('Starting production server...');
  execSync('node dist/index.js', { stdio: 'inherit' });
}
