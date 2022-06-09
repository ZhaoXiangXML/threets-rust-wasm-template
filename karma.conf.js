const path = require("path");
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const os = require("os");

const ENTROPY_SIZE = 1000000;
const outputPath = `${path.join(os.tmpdir(), "_karma_webpack_")}${Math.floor(Math.random() * ENTROPY_SIZE)}`;

module.exports = function (config) {
    config.set({

        frameworks: ["mocha"],

        mime: {
            'application/wasm': ['wasm']
        },

        files: [

            { pattern: "node_modules/expect.js/index.js" },
            { pattern: "spec/**/*.ts" },
            {
                pattern: `${outputPath}/**/*`,     // <-- here
                watched: false,
                included: false,
            },
        ],

        webpack: {
            mode: "development",
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        exclude: /node_modules/,
                        use: "ts-loader",
                    }
                ],
            },
            output: {
                path: outputPath,
            },
            plugins: [
                new WasmPackPlugin({
                    crateDirectory: __dirname,
                    outDir: "target/pkg"
                })
            ],
            resolve: {
                extensions: [".tsx", ".ts", ".js", ".wasm"],
            },
            experiments: {
                asyncWebAssembly: true,
            },

        },

        preprocessors: {
            "**/*.ts": ["webpack"]
        },

        browsers: ["Chrome"],

        singleRun: false,

        exprContextCritical: false,
    });
};