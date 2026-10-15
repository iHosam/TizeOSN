import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'mods/userScript.js',
  output: {
    file: 'dist/userScript.js',
    format: 'iife',
    name: 'TizeOSN',
    banner: '/* TizeOSN - Ad-Free OSN+ Client for Samsung Smart TVs (Tizen OS) | GPL-3.0 */',
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
  ],
};
