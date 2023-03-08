# Custom ESBuild with SCSS, PurgeCSS & LiveServer

* Custom `esbuild` setup for ⚡ super ⚡ fast ⚡ builds.
* This setup also includes Bootstrap 5 and Feather Icons

## Installing dependencies

* Install dependencies with `npm install`

## Running Dev Server

* Start server endpoint with `npm start`
* This will build the files and run live server at [`localhost:7000`](http://localhost:7000).
* CSS/JS build files are outputted to `dist/styles/style.css` & `dist/scripts/script.js` with `npm run build`

## Building Files

## About PurgeCSS

* To add list of files for `PurgeCSS`, add them in `esbuid_watch.js` and `esbuild.js` inside `purgecssPlugin2({ content: glob.sync([ ... ]})` block.
* To add a list of safe-list classes that should always be added in CSS, add them in `views/purgecss.html`.
