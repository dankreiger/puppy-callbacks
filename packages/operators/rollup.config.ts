import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
const extensions = ['.ts'];

const babelRuntimeVersion = pkg.devDependencies['@babel/runtime'].replace(
  /^[^0-9]*/,
  ''
);

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: { file: pkg.main, format: 'cjs', indent: false },
    external: makeExternalPredicate([
      ...Object.keys(pkg.devDependencies || {}),
    ]),
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({
        tsconfig: 'tsconfig.prod.json',
        useTsconfigDeclarationDir: true,
      }),
      babel({
        extensions,
        plugins: [
          ['@babel/plugin-transform-runtime', { version: babelRuntimeVersion }],
        ],
        babelHelpers: 'runtime',
      }),
    ],
  },

  // ES
  {
    input: 'src/index.ts',
    output: { file: pkg.module, format: 'es', indent: false },
    external: makeExternalPredicate([
      ...Object.keys(pkg.devDependencies || {}),
    ]),
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({
        tsconfig: 'tsconfig.prod.json',
        tsconfigOverride: {
          compilerOptions: { declaration: false, composite: false },
        },
      }),
      babel({
        extensions,
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            { version: babelRuntimeVersion, useESModules: true },
          ],
        ],
        babelHelpers: 'runtime',
      }),
    ],
  },

  // ES for Browsers
  {
    input: 'src/index.ts',
    output: { file: pkg.mjs, format: 'es', indent: false },
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({
        tsconfig: 'tsconfig.prod.json',
        tsconfigOverride: {
          compilerOptions: { declaration: false, composite: false },
        },
      }),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
    ],
  },

  // UMD Development
  {
    input: 'src/index.ts',
    output: {
      file: pkg.unpkg,
      format: 'umd',
      name: 'Operators',
      indent: false,
    },
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({
        tsconfig: 'tsconfig.prod.json',
        tsconfigOverride: {
          compilerOptions: { declaration: false, composite: false },
        },
      }),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
    ],
  },

  // UMD Production
  {
    input: 'src/index.ts',
    output: {
      file: pkg.unpkgmin,
      format: 'umd',
      name: 'Operators',
      indent: false,
    },
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({
        tsconfig: 'tsconfig.prod.json',
        tsconfigOverride: {
          compilerOptions: { declaration: false, composite: false },
        },
      }),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
    ],
  },
];
