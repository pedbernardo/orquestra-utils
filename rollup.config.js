export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/orquestra-utils.esm.js',
      format: 'esm'
    },
    {
      name: 'Utils',
      file: 'dist/orquestra-utils.js',
      format: 'umd'
    }
  ]
}
