const path = require('path');
const webpack = require('webpack');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = (env) => {
    const mode = env.mode || 'development';
    const agent = env.agent || 'mock';

    return {
        entry: {
            'gitversion/setup': path.resolve(__dirname, 'src/tasks/gitversion/setup.ts'),
            'gitversion/execute': path.resolve(__dirname, 'src/tasks/gitversion/execute.ts'),
            'gitreleasemanager/setup': path.resolve(__dirname, 'src/tasks/gitreleasemanager/setup.ts'),
        },
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
                    replace: 'require(resourceFile)'
                }, {
                    search: /call\(this, \"\/\"\)\)/gi,
                    replace: "call(this, __dirname))"
                }, {
                    search: /let pkg.*'package.json'\)\);/,
                    replace: ''
                }, {
                    search: /let userAgent = 'vsts-task-installer\/' \+ pkg.version;/,
                    replace: "let userAgent = 'vsts-task-installer'"
                }]
            }])
        ]
    }
};