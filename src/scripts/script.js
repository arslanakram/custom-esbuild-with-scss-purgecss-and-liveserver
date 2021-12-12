/**
 * Custom ESBuild with SCSS, PurgeCSS & LiveServer
 *
 * This serves as the global JS file
 *
 * @version 1.0.0
 * @author Arslan Akram <arslan@pixelative.co>
 * @copyright 2021, Pixelative <pixelative.co>
 * @license MIT (https://opensource.org/licenses/MIT)
 */

'use strict';

// Third-Party Imports
import BSSetup from './_1_third_party_setup/_1_bootstrap.js';
window.feather = require('feather-icons');

// Init Third-Party
BSSetup.init();
feather.replace();
