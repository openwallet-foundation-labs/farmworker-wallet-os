export default [
  // Node
  {
    input: './lib/index.js',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true
      }
    ],
    external: ['base64url']
  },
  // Browser and React Native
  {
    input: './lib/browser.js',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true
      }
    ],
    external: ['base64url']
  },
];
