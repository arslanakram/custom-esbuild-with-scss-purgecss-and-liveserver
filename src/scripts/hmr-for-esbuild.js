/**
 * Hot-Module Replacement on ESBuild
 *
 * Only for development server
 *
 * @see https://github.com/evanw/esbuild/pull/2816
 *
 * @version 1.0.0
 * @author Arslan Akram <arslan@pixelative.co>
 * @copyright 2021 - 2023, Pixelative <pixelative.co>
 * @license MIT (https://opensource.org/licenses/MIT)
 */

'use strict';

export default function initHMR() {
    new EventSource('/esbuild').addEventListener('change', (e) => {
        const { added, removed, updated } = JSON.parse(e.data);
        if (!added.length && !removed.length && updated.length === 1) {
            for (const link of document.getElementsByTagName('link')) {
                const url = new URL(link.href);
                if (url.host === location.host && url.pathname === updated[0]) {
                    const next = link.cloneNode();
                    next.href = updated[0] + '?' + Math.random().toString(36).slice(2);
                    next.onload = () => link.remove();
                    link.parentNode.insertBefore(next, link.nextSibling);
                    return;
                }
            }
        } else {
            location.reload();
        }
    });
}
