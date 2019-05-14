/**
 * A plugin for babel that will ignore imports for file types which can't be
 * transpiled via babel.
 *
 * @see {@link https://stackoverflow.com/questions/32236443/mocha-testing-failed-due-to-css-in-webpack}
 */
const DEFAULT_EXTENSION = [
    '.html',
    '.css',
    '.scss',
    '.sass',
    '.pcss',
    '.stylus',
    '.styl',
    '.less',
    '.sss',
    '.gif',
    '.jpeg',
    '.jpg',
    '.png',
    '.svg',
    '.mp4',
    '.webm',
    '.ogv'
];
for (let i of DEFAULT_EXTENSION) {
    require.extensions[i] = () => null;
}