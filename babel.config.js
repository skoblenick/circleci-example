/**
 * Babel configuration.
 *
 * @see {@link https://babeljs.io/docs/en/configuration}
 *
 * @param {Object} api
 * @return {Object} Returns babel configuration options.
 */
module.exports = (api) => {
    api.cache(true);

    return {
        compact: true,
        plugins: [],
        presets: [
            '@babel/preset-env'
        ]
    };
};