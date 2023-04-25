import liveServer from '@compodoc/live-server';
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import glob from 'glob-all';
import purgecssPlugin2 from 'esbuild-plugin-purgecss-2';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

// Turn on LiveServer on http://localhost:7000
liveServer.start({
    port: 7000,
    host: 'localhost',
    root: '',
    open: true,
    ignore: 'node_modules',
    wait: 0,
});

// Generate CSS/JS Builds
esbuild
    .build({
        logLevel: 'debug',
        metafile: true,
        entryPoints: ['src/styles/style.scss', 'src/scripts/script.js'],
        outdir: 'dist',
        bundle: true,
        watch: true,
        plugins: [
            sassPlugin({
                async transform(source) {
                    const { css } = await postcss([autoprefixer]).process(
                        source
                    );
                    return css;
                },
            }),
            purgecssPlugin2({
                content: glob.sync([
                    './*.html',
                    './views/**/*.html',
                    './src/scripts/*.js',
                    './src/scripts/**/*.js',
                ]),
            }),
        ],
    })
    .then(() => console.log('⚡ Styles & Scripts Compiled! ⚡ '))
    .catch(() => process.exit(1));
