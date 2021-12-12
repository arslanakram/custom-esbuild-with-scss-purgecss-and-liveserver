/**
 * Bootstrap JS Setup File
 *
 * This serves as the global bootstrap setup
 *
 * @version 1.0.0
 * @author Arslan Akram <arslan@pixelative.co>
 * @copyright 2021, Pixelative <pixelative.co>
 * @license MIT (https://opensource.org/licenses/MIT)
 */

window.bootstrap = require('bootstrap');

export class BSSetup {
    constructor() {
        this.tooltipsEl = '[data-bs-toggle="tooltip"]';
        this.popoversEl = '[data-bs-toggle="popover"]';
        this.toastsEl = '.toast';
    }

    tooltips() {
        new bootstrap.Tooltip(document.body, {
            selector: this.tooltipsEl,
        });
    }

    popovers() {
        document.querySelectorAll(this.popoversEl).forEach(function (popover) {
            new bootstrap.Popover(popover);
        });
    }

    toasts() {
        document.querySelectorAll(this.toastsEl).forEach(function (toastNode) {
            var toast = new bootstrap.Toast(toastNode, {
                autohide: false,
            });

            toast.show();
        });
    }

    init() {
        this.tooltips();
        this.popovers();
        this.toasts();
    }
}

export default new BSSetup();
