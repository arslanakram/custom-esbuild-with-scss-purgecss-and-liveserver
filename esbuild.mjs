import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import glob from "glob-all";
import purgecssPlugin2 from "esbuild-plugin-purgecss-2";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

// Generate CSS/JS Builds
esbuild
    .build({
        logLevel: "debug",
        metafile: true,
        entryPoints: ["src/styles/style.scss", "src/scripts/script.js"],
        outdir: "dist",
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
                content: glob.sync(["./*.html", "./views/**/*.html", "./src/scripts/*.js", "./src/scripts/**/*.js"]),
            }),
        ],
    })
    .then(() => console.log("⚡ Build complete! ⚡"))
    .catch(() => process.exit(1));
