import pkg from './package.json';

export default [
  {
    input: './lib/index.js',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true
      }
    ],
    external: Object.keys(pkg.dependencies).concat(['crypto', 'util'])
  },
  {
    input: './lib/ed25519-browser.js',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true
      }
    ],
    external: Object.keys(pkg.dependencies).concat(['crypto', 'util'])
  },
  {
    input: './lib/ed25519-reactnative.js',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true
      }
    ],
    external: Object.keys(pkg.dependencies).concat(['crypto', 'util'])
  }
];
