const path = require('path');
const webpack = require('webpack');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

function getConfig(mode, agent, entry) {
    return {
        entry: entry,
        target: 'node',
        mode: mode,
        devtool: mode == 'development' ? 'inline-source-map' : false,
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json'],
        },
        output: {
            libraryTarget: 'commonjs2',
            filename: '[name]/bundle.js',
            path: path.resolve(__dirname, `dist/${agent}`),
        },
        node: {
            __dirname: false,
            __filename: false
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(
                /agent\/mock\/build-agent/,
                `../agent/${agent}/build-agent`
            ),
            new ReplaceInFileWebpackPlugin([{
                dir: `dist/${agent}`,
                test: /bundle.js/,
                rules: [{
                    search: /__webpack_require__\(.*\)\(resourceFile\)/,
                    replace: '_loadResJson(resourceFile)'
                }, {
                    search: /let pkg.*'package.json'\)\);/,
                    replace: 'let pkg = { version: "1.2.3" };'
                }]
            }])
        ]
    }
}

const entryPoints = [
    'gitversion/setup',
    'gitversion/execute',
    'gitreleasemanager/setup',
    'gitreleasemanager/create',
    'gitreleasemanager/discard',
    'gitreleasemanager/close',
    'gitreleasemanager/open',
];

module.exports = (env) => {
    const task = env.task || 'compile';
    const agent = env.agent || 'mock';
    const mode = task == 'compile' ? 'development' : 'production';
    const entry = {};
    entryPoints.forEach(key => {
        const resource = task == 'compile' ? `src/tasks/${key}.ts` : `dist/${agent}/${key}/bundle.js`;
        entry[key] = path.resolve(__dirname, resource);
    });

    return getConfig(mode, agent, entry);
};