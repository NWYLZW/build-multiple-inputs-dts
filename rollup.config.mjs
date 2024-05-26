import dts from 'rollup-plugin-dts'

export default {
  input: ['./src/b.ts', './src/a.ts'],
  output: {
    dir: 'dist',
  },
  plugins: [
    dts({ tsconfig: './tsconfig.json' })
  ]
}
