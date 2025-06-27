// pnpmfile.mjs
export const hooks = {
  updateConfig(config) {
    return {
      ...config,
      shamefullyHoist: false,
      strictPeerDependencies: false,
      autoInstallPeers: true,
      saveExact: false,
      savePrefix: '^',
      nodeLinker: 'isolated',
      preferWorkspacePackages: true,
      sharedWorkspaceLockfile: true,
      publishBranch: 'master',
      gitChecks: true,
    }
  },
}
