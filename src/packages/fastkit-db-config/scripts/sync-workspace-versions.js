const fs = require('fs');
const path = require('path');

function updateWorkspaceDeps(dir) {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  let changed = false;

  ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
    if (!pkg[depType]) return;

    for (const depName in pkg[depType]) {
      if (pkg[depType][depName] === 'workspace:*') {
        // Read actual version from package folder
        const depPkgPath = path.join(__dirname, '..', 'packages', depName.replace('@nexgenstudiodev/', ''), 'package.json');
        if (fs.existsSync(depPkgPath)) {
          const depPkg = JSON.parse(fs.readFileSync(depPkgPath, 'utf-8'));
          pkg[depType][depName] = depPkg.version;
          changed = true;
          console.log(`Updated ${depName} to version ${depPkg.version} in ${depType} of ${pkg.name}`);
        }
      }
    }
  });

  if (changed) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
}

// Run for all packages in /packages and root
const packagesDir = path.join(__dirname, '..', 'packages');
fs.readdirSync(packagesDir).forEach(pkgName => {
  updateWorkspaceDeps(path.join(packagesDir, pkgName));
});
updateWorkspaceDeps(path.join(__dirname, '..')); // root package.json
