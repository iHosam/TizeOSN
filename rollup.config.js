import { nodeResolve } from '@rollup/plugin-node-resolve';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default {
  input: 'mods/userScript.js',
  output: {
    file: 'dist/userScript.js',
    format: 'iife',
    name: 'TizeOSN',
    banner: '/* TizeOSN - Ad-Free OSN+ Client for Samsung Smart TVs (Tizen OS) | GPL-3.0 */',
    plugins: [
      getBabelOutputPlugin({
        allowAllFormats: true,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: 'Chrome 47',
            },
          ],
        ],
      }),
    ],
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
  ],
};
