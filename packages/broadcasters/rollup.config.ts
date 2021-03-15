import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      name: 'Broadcasters',
      file: pkg.browser,
      format: 'iife',
    },
  ],
  plugins: [
    resolve(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
  external: Object.keys(pkg.devDependencies),
};

export default config;
