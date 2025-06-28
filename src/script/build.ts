import { execSync } from 'child_process';


export function build() {
  console.log('Running clean...');
  execSync('rimraf dist', { stdio: 'inherit' });

  console.log('Compiling TypeScript...');
  execSync('tsc', { stdio: 'inherit' });

  console.log('Fixing path aliases...');
  execSync('pnpm exec tsc-alias', { stdio: 'inherit' });

  console.log('Build complete!');
}
