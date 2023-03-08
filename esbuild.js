/**
 * Custom ESBuild with SCSS, PurgeCSS & Live server
 *
 * Thanks to <https://github.com/dalcib> for the update on live server
 * @see https://github.com/evanw/esbuild/issues/802#issuecomment-819578182
 */

import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import glob from 'glob-all';
import purgecssPlugin2 from 'esbuild-plugin-purgecss-2';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

// Create a context for incremental builds
// https://github.com/evanw/esbuild/pull/2816
const context = await esbuild.context({
    entryPoints: ['src/styles/style.scss', 'src/scripts/script.js'],
    outdir: 'dist',
    logLevel: 'debug',
    metafile: true,
    bundle: true,
    minify: true,
    plugins: [
        sassPlugin({
            async transform(source) {
                const { css } = await postcss([autoprefixer]).process(source);
                return css;
            },
        }),
        purgecssPlugin2({
            content: glob.sync(['./*.html', './views/**/*.html', './src/scripts/*.js', './src/scripts/**/*.js']),
        }),
    ],
});

// Enable watch mode
await context.watch();

// Enable serve mode
await context.serve({
    servedir: './dist',
    port: 7000,
});
