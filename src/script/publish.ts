import { execSync } from 'child_process';

/**
 * Bump version, run format/lint/build, then publish
 * @param bumpType one of 'patch' | 'minor' | 'major' (default: patch)
 * @param tag optional npm tag (e.g., 'beta')
 */
function publishWithVersionBump(bumpType = 'patch', tag?: string) {
  console.log(`Bumping version (${bumpType})...`);
  execSync(`npm version ${bumpType}`, { stdio: 'inherit' });

  console.log('Running prepublish tasks: format, lint, build');
  execSync('pnpm run format && pnpm run lint && pnpm run build', { stdio: 'inherit' });

  const publishCmd = tag
    ? `npm publish --access public --tag ${tag}`
    : 'npm publish --access public';

  console.log(`Publishing${tag ? ` with tag "${tag}"` : ''} to npm...`);
  execSync(publishCmd, { stdio: 'inherit' });
}

export function publish() {
  publishWithVersionBump('patch');
}

export function publishBeta() {
  publishWithVersionBump('patch', 'beta');
}
