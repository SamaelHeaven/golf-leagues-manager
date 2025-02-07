const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const nodeExternals = require("webpack-node-externals");

dotenv.config();

const applicationConfig = {
    mode: process.env.ENVIRONMENT,
    name: "application",
    entry: "./src/application/main",
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: "index.js"
    },
    resolve: {
        alias: {
            "@application": path.resolve(__dirname, "src/application"),
            "@common": path.resolve(__dirname, "src/common")
        },
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            HOST: `${process.env.HOST}:${process.env.EXTERNAL_WEB_PORT}`
        })
    ]
};

const backendConfig = {
    mode: process.env.ENVIRONMENT,
    name: "backend",
    target: "node",
    entry: "./src/backend/main",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    resolve: {
        alias: {
            "@backend": path.resolve(__dirname, "src/backend"),
            "@common": path.resolve(__dirname, "src/common")
        },
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    externals: [nodeExternals()]
};

module.exports = [applicationConfig, backendConfig];
