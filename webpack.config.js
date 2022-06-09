const path = require("path");
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { env } = require("process");

module.exports = {
    devtool: "inline-source-map",
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true
    },
    entry: "./src/ts/bootstrap.ts",
    mode: "none",
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
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new WasmPackPlugin({
            crateDirectory: __dirname,
            outDir: "target/pkg"
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/html/*", to: "[name][ext]" },
            ],
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".wasm"],
    },
    experiments: {
        asyncWebAssembly: true
    },
};