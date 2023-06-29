import merge from 'deepmerge';
import html from '@web/rollup-plugin-html';
import copy from 'rollup-plugin-copy';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: './index.html',
  output: {
    dir: 'dist',
    sourcemap: false,
  },
  onwarn(warning) {
    // See https://stackoverflow.com/a/43556986/1316011
    // Skip certain warnings
    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }

    // console.warn everything else
    // eslint-disable-next-line no-console
    console.warn(warning.message);
  },
  plugins: [
    // set base href for deployed default case
    // remove dev CSP setting 'unsafe-inline'
    html({
      transformHtml: [
        htm => htm.replace('<base href="/">', '<base href="/my-app/">'),
        htm => htm.replace(" 'unsafe-inline'", ''),
      ],
      strictCSPInlineScripts: true,
    }),
    copy({
      // copy over images files, manifest, etc.
      targets: [
        { src: 'images', dest: 'dist' },
        { src: 'manifest.json', dest: 'dist' },
      ],
      // set flatten to false to preserve folder structure
      flatten: false,
    }),
  ],
});
